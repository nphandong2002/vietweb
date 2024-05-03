'use client';

import { RoomType } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';

import { getInfo } from 'src/database/room/room';
import { RoomDeailPageProps } from 'src/shared/types/layout';

import RoomDetailDrawPage from './detail-type/draw';
import RoomDetailPetPage from './detail-type/pet';
import { useMutation, useSelf, useStorage } from 'src/liveblocks.config';
import uuidv4 from 'src/shared/utils/uuidv4';
import { LiveObject } from '@liveblocks/client';
import { SizePet } from 'src/shared/types/canvas';

function RoomDetailPage({ roomId }: RoomDeailPageProps) {
  const [typeRoom, settypeRoom] = useState<RoomType>();
  const self = useSelf();
  const insertLayer = useMutation(({ storage }, x: number, y: number) => {
    const liveLayers = storage.get('petLayer');
    const liveLayerIds = storage.get('layerIds').filter((a) => a.startsWith('pet'));
    const layerId = `pet_${self.id}_${uuidv4()}`;
    const layer = new LiveObject({
      type: self.presence.pet.petType,
      x: x,
      y: y,
      col: 8,
      row: 8,
      size: SizePet.SM,
    });
    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const roomInfo = await getInfo(roomId);
      settypeRoom(roomInfo?.type);
    };
    fetchData();
  }, [roomId]);
  if (typeRoom == 'draw') return <RoomDetailDrawPage roomId={roomId} />;
  if (typeRoom == 'pet') return <RoomDetailPetPage roomId={roomId} />;

  return <></>;
}

export default RoomDetailPage;
