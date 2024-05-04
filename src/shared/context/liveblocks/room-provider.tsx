'use client';

import { ReactNode } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';
import { LiveMap, LiveList, LiveObject } from '@liveblocks/client';

import { RoomProvider } from 'src/liveblocks.config';
import { Layer, PetLayer } from 'src/shared/types/canvas';
import { PetType } from 'src/sections/pages/room/detail-type/pet/type-pet';

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
        pet: {
          petType: PetType.Tabby,
        },
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
        petLayer: new LiveMap<string, LiveObject<PetLayer>>(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};
