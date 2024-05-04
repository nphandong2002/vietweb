import { useMutation, useStorage } from 'src/liveblocks.config';
import { RoomDeailPageProps } from 'src/shared/types/layout';
import { Participants } from '../../_compoment/user/participants';
import { CursorsPresence } from '../../_compoment/user/cursors-presence';
import { useCallback, useRef, useState } from 'react';
import { Camera, CanvasMode, CanvasState } from 'src/shared/types/canvas';
import { pointerEventToCanvasPoint } from 'src/lib/utils';
import { LayerPreview } from './layer-preview';
import PetInfo from './info';

function RoomDetailPetPage({ roomId }: RoomDeailPageProps) {
  const refSVG = useRef<SVGSVGElement>(null);
  const layerIds = useStorage((root) => root.layerIds.filter((a) => a.startsWith('pet')));
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  //base
  const onLayerPointerDown = () => {};
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      if (refSVG.current) {
        let box = refSVG.current.getBoundingClientRect();
        e.clientX -= box.x;
        e.clientY -= box.y;
      }
      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({
        cursor: current,
      });
    },
    [canvasState],
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  return (
    <div className="relative">
      <Participants />
      <PetInfo />
      <svg
        ref={refSVG}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        className="h-[100vh] w-full"
      >
        <CursorsPresence type="pet" />
        {layerIds.map((layerId) => (
          <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} />
        ))}
      </svg>
    </div>
  );
}

export default RoomDetailPetPage;
