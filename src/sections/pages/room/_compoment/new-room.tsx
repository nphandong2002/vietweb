'use client';

import { useLocales } from 'src/locales';
import Iconify from 'src/sections/component/iconify';
import { Button } from 'src/sections/component/ui/button';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';

function NewRoomButton() {
  const { t } = useLocales();
  const isNew = useBoolean(false);
  let Comp = isNew ? 'div' : 'button';
  return (
    <div className="col-span-1 aspect-[100/127] bg-[var(--bg-active)] rounded-lg  flex flex-col items-center justify-center py-6">
      {isNew && (
        <button className="flex flex-col items-center justify-center">
          <Iconify icon="gg:add" width={30} />
          {t('add')}
        </button>
      )}
    </div>
  );
}

export default NewRoomButton;
