'use client';

import { useEffect, useState } from 'react';

import { useLocales } from 'src/locales';
import { getRooms } from 'src/service/room';
import Each from 'src/sections/component/each';
import { RoomInfo } from 'src/shared/types/room';
import { useCurrentUser } from 'src/shared/hooks/client/use-user';

import NewRoomButton from './_compoment/new-room';
import Link from 'next/link';
import { PATHS } from 'src/config';
import Image from 'next/image';
import { cn } from 'src/lib/utils';
import useTypeRoomData from './_compoment/type-room-config';
import { fDate } from 'src/shared/utils/format-time';

function RoomPage() {
  const { t } = useLocales();
  const user = useCurrentUser();
  const opsTypeRoom = useTypeRoomData();
  const [rooms, setrooms] = useState<RoomInfo>([]);

  useEffect(() => {
    const fetchData = async () => {
      let resp = await getRooms(user?.id);
      setrooms(resp);
    };
    fetchData();
  }, [user, setrooms]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {user && <NewRoomButton />}
      {!user && !rooms.length && <div></div>}
      <Each
        of={rooms}
        render={({ id, image, title, createdAt, user, type }) => (
          <Link href={PATHS.room.detail(id)}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
              <div className="relative flex-1 bg-amber-50">
                <Image src={image || ''} alt={title} fill className="object-fit" />
                <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
              </div>
              <div className="relative  p-3">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-[13px] truncate max-w-full">{title} </p>
                  <p className="text-[13px] truncate ">
                    {opsTypeRoom.find((op) => op.value == type)?.label}
                  </p>
                </div>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                  {user.name}, {fDate(createdAt)}
                </p>
                <button
                  className={cn(
                    'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
                    'cursor-not-allowed opacity-75'
                  )}
                ></button>
              </div>
            </div>
          </Link>
        )}
      />
    </div>
  );
}

export default RoomPage;
