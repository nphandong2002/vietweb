'use client';

import { useCallback, useState } from 'react';

import { pointerEventToCanvasPoint } from 'src/lib/utils';
import { RoomDeailPageProps } from 'src/shared/types/layout';
import { useMutation, useSelf, useStorage } from 'src/liveblocks.config';
import { Camera, CanvasMode, CanvasState } from 'src/shared/types/canvas';
import { useDisableScrollBounce } from 'src/shared/hooks/client/use-disable-scroll-bounce';

import { Participants } from './_compoment/detail/participants';
import { CursorsPresence } from './_compoment/detail/cursors-presence';

function RoomDetailPage({ roomId }: RoomDeailPageProps) {
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  useDisableScrollBounce();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    [camera, canvasState]
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  const onPointerDown = useCallback((e: React.PointerEvent) => {}, []);
  const onPointerUp = useCallback((e: React.PointerEvent) => {}, []);

  return (
    <div>
      <Participants />
      <svg
        className="h-[100vh] w-[100vw]"
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
          <CursorsPresence />
        </g>
      </svg>
    </div>
  );
}

export default RoomDetailPage;
