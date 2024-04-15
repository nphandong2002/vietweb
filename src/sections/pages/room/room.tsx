'use client';

import { useLocales } from 'src/locales';
import NewRoomButton from './_compoment/new-room';

function RoomPage() {
  const { t } = useLocales();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      <NewRoomButton />
    </div>
  );
}

export default RoomPage;
