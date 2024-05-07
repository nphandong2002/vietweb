import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { pointerEventToCanvasPoint } from 'src/lib/utils';
import { RoomDeailPageProps } from 'src/shared/types/layout';
import useInterval from 'src/shared/hooks/client/use-interval';
import { useMutation, useSelf, useStorage } from 'src/liveblocks.config';
import { Camera, CanvasMode, CanvasState, Point } from 'src/shared/types/canvas';

import PetInfo from './info';
import { optionPet, workPet } from './type-pet';
import { LayerPreview } from './_compoment/layer-preview';
import { getRandomWorkNor } from './config/config-pet-common';

import { Participants } from '../../_compoment/user/participants';
import { CursorsPresence } from '../../_compoment/user/cursors-presence';
import RoomPetToolbar from './_compoment/handle/room-pet-toolbar';

function RoomDetailPetPage({ roomId }: RoomDeailPageProps) {
  //layerPet
  const self = useSelf();
  const idPets = useStorage((root) => root.petLayer);
  const idCurrent = useMemo(
    () => Array.from(idPets.keys()).find((a) => a.startsWith(`pet_${self.id}`)),
    [self, idPets],
  );
  const petCurrent = useMemo(() => (idCurrent ? idPets.get(idCurrent) : null), [idCurrent, idPets]);
  const refSVG = useRef<SVGSVGElement>(null);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const setPetCurrent = useMutation(
    ({ storage }, op: optionPet) => {
      let pets = storage.get('petLayer');
      if (idCurrent) {
        let pet = pets.get(idCurrent);
        if (pet) {
          pet.update({
            type: op.type ?? pet.get('type'),
            x: op.x ?? pet.get('x'),
            y: op.y ?? pet.get('y'),
            xp: op.xp ?? pet.get('xp'),
            size: op.size ?? pet.get('size'),
            name: op.name ?? pet.get('name'),
            status: op.status ?? pet.get('status'),
            work: op.work ?? pet.get('work'),
          });
        }
      }
    },
    [idCurrent],
  );

  useInterval(() => {
    if (petCurrent && petCurrent.work == workPet.Move) return;
    const random = Math.floor(Math.random() * 10 + 1);
    let x = 0,
      y = 0;
    if (refSVG.current && petCurrent) {
      let box = refSVG.current.getBoundingClientRect();
      y = petCurrent.y;
      x = petCurrent.x;
      y += 1;
      x += 1;
      x > box.width && (x = 0);
      y > box.height && (y = 0);
    }
    setPetCurrent({
      work: (random % 10 == 0 && getRandomWorkNor()) || undefined,
    });
  }, 100);

  useEffect(() => {
    if (refSVG.current) {
      let box = refSVG.current.getBoundingClientRect();

      setCamera((c) => ({
        ...c,
        width: box.width,
        height: box.height,
      }));
    }
  }, [refSVG]);
  //select
  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length <= 0) return;
    setMyPresence({ selection: [] });
  }, []);
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get('petLayer');

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            work: workPet.Move,
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  //base
  const onLayerPointerDown = useMutation(({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
    e.stopPropagation();
    if (refSVG.current) {
      let box = refSVG.current.getBoundingClientRect();
      e.clientX -= box.x;
      e.clientY -= box.y;
    }
    const point = pointerEventToCanvasPoint(e, camera);
    if (!self.presence.selection.includes(layerId)) setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, []);
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }
      const current = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Translating) translateSelectedLayers(current);

      setMyPresence({
        cursor: current,
      });
    },
    [canvasState],
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
    unselectLayers();
  }, []);
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      ...camera,
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const onPointerUp = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
    unselectLayers();

    setPetCurrent({
      work: workPet.Idle3,
    });
  }, []);

  return (
    <div className="relative">
      {self.info?.isUser && (
        <>
          <Participants />
          <PetInfo />
          <RoomPetToolbar camera={camera} setCamera={setCamera} petCurrent={petCurrent} />
        </>
      )}
      <svg
        ref={refSVG}
        onWheel={onWheel}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        className="w-full"
        style={{
          height: `calc(98vh - 1rem)`,
          transform: `translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        <g>
          <CursorsPresence type="pet" />
          {Array.from(idPets.keys()).map((petId) => (
            <LayerPreview key={petId} id={petId} onLayerPointerDown={onLayerPointerDown} isBoss={idCurrent == petId} />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default RoomDetailPetPage;
