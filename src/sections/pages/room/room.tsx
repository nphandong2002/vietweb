'use client';

import { useLocales } from 'src/locales';
import Iconify from 'src/sections/compoment/iconify';

function RoomPage() {
  const { t } = useLocales();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      <button>
        <div className="col-span-1 aspect-[100/127] bg-[var(--bg-active)] rounded-lg  flex flex-col items-center justify-center py-6">
          <Iconify icon="gg:add" width={30} />
          {t('add')}
        </div>
      </button>
    </div>
  );
}

export default RoomPage;
