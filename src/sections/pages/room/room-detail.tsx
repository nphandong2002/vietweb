'use client';

import { RoomType } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';

import { getInfo } from 'src/database/room/room';
import { RoomDeailPageProps } from 'src/shared/types/layout';

import RoomDetailPetPage from './detail-type/pet';
import RoomDetailDrawPage from './detail-type/draw';

function RoomDetailPage({ roomId }: RoomDeailPageProps) {
  const [typeRoom, settypeRoom] = useState<RoomType>();

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
