'use client';

import { LiveObject } from '@liveblocks/client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from 'src/liveblocks.config';
import {
  resizeBounds,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  findIntersectingLayersWithRectangle,
} from 'src/lib/utils';
import uuidv4 from 'src/shared/utils/uuidv4';
import { RoomDeailPageProps } from 'src/shared/types/layout';
import { colorToCss, connectionIdToColor } from 'src/lib/color';
import { useDisableScrollBounce } from 'src/shared/hooks/client/use-disable-scroll-bounce';
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from 'src/shared/types/canvas';

import { useDeleteLayers } from './_hook/use-delete-layers';

import { Path } from './_component/layer';
import { Toolbar } from './_component/handler/toolbar';
import { LayerPreview } from './_component/layer-preview';
import { Participants } from './_component/user/participants';
import { CursorsPresence } from './_component/user/cursors-presence';
import { SelectionBox } from './_component/selection/selection-box';
import { SelectionTools } from './_component/selection/selection-tools';

const MAX_LAYERS = 100;
function RoomDetailDrawPage({ roomId }: RoomDeailPageProps) {
  useDisableScrollBounce();
  //init
  const refSVG = useRef<SVGSVGElement>(null);
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const deleteLayers = useDeleteLayers();
  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  //action
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );
  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const id = uuidv4();
      const { pencilDraft } = self.presence;
      const liveLayers = storage.get('layers');
      const liveLayerIds = storage.get('layerIds');

      if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS)
        return setMyPresence({ pencilDraft: null });

      liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)));
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor],
  );
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null) return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      LayerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
      position: Point,
    ) => {
      const liveLayers = storage.get('layers');
      if (liveLayers.size > MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get('layerIds');
      const layerId = uuidv4();
      const layer = new LiveObject({
        type: LayerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );

  //selection
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get('layers').toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current);

      setMyPresence({ selection: ids });
    },
    [layerIds],
  );
  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length <= 0) return;
    setMyPresence({ selection: [] }, { addToHistory: true });
  }, []);

  //keyDown
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      console.log(e.key);

      switch (e.key) {
        case 'Delete': {
          deleteLayers();
          break;
        }
        case 'ArrowUp': {
          setCamera((camera) => ({
            x: camera.x,
            y: camera.y + 100,
          }));
          break;
        }
        case 'ArrowDown': {
          setCamera((camera) => ({
            x: camera.x,
            y: camera.y - 100,
          }));
          break;
        }
        case 'ArrowLeft': {
          setCamera((camera) => ({
            x: camera.x + 100,
            y: camera.y,
          }));
          break;
        }
        case 'ArrowRight': {
          setCamera((camera) => ({
            x: camera.x - 100,
            y: camera.y,
          }));
          break;
        }
        case 'z': {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [deleteLayers, history]);

  //resize
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

      const liveLayers = storage.get('layers');
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) layer.update(bounds);
    },
    [canvasState],
  );
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      console.log(corner);

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  //traslate
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get('layers');

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  //handlesvg
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }
      const current = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Pencil) continueDrawing(current, e);
      if (canvasState.mode === CanvasMode.Pressing) startMultiSelection(current, canvasState.origin);
      if (canvasState.mode === CanvasMode.SelectionNet) updateSelectionNet(current, canvasState.origin);
      if (canvasState.mode === CanvasMode.Resizing) resizeSelectedLayer(current);
      if (canvasState.mode === CanvasMode.Translating) translateSelectedLayers(current);
      setMyPresence({ cursor: current });
    },
    [camera, canvasState, continueDrawing, refSVG, updateSelectionNet, startMultiSelection],
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }

      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) return;
      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }
      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, refSVG, startDrawing],
  );
  const onPointerUp = useMutation(
    ({}, e) => {
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Pencil) insertPath();
      else if (canvasState.mode === CanvasMode.Inserting) insertLayer(canvasState.layerType, point);
      else setCanvasState({ mode: CanvasMode.None });
      history.resume();
    },
    [refSVG, camera, canvasState, history, insertLayer, insertPath, setCanvasState, unselectLayers],
  );
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) return;
      history.pause();
      e.stopPropagation();
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }
      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerId)) setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [refSVG, setCanvasState, camera, history, canvasState.mode],
  );
  return (
    <div className="relative">
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      <svg
        ref={refSVG}
        className="h-[100vh] w-full"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path points={pencilDraft} fill={colorToCss(lastUsedColor)} x={0} y={0} />
          )}
        </g>
      </svg>
    </div>
  );
}

export default RoomDetailDrawPage;
