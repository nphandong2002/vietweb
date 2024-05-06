import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { pointerEventToCanvasPoint } from 'src/lib/utils';
import { RoomDeailPageProps } from 'src/shared/types/layout';
import useInterval from 'src/shared/hooks/client/use-interval';
import { useMutation, useSelf, useStorage } from 'src/liveblocks.config';
import { Camera, CanvasMode, CanvasState } from 'src/shared/types/canvas';

import PetInfo from './info';
import { optionPet } from './type-pet';
import { LayerPreview } from './_compoment/layer-preview';
import { getRandomWorkNor } from './config/config-pet-common';

import { Participants } from '../../_compoment/user/participants';
import { CursorsPresence } from '../../_compoment/user/cursors-presence';

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
      x: (random % 3 == 0 && x) || undefined,
      y: (random % 4 == 0 && y) || undefined,
      work: (random % 10 == 0 && getRandomWorkNor()) || undefined,
    });
  }, 100);

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
        {Array.from(idPets.keys()).map((petId) => (
          <LayerPreview key={petId} id={petId} onLayerPointerDown={onLayerPointerDown} />
        ))}
      </svg>
    </div>
  );
}

export default RoomDetailPetPage;
