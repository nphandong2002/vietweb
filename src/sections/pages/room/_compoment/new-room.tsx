'use client';

import { useLocales } from 'src/locales';
import Iconify from 'src/sections/component/iconify';
import { Button } from 'src/sections/component/ui/button';
import { Input } from 'src/sections/component/ui/input';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';

function NewRoomButton() {
  const { t } = useLocales();
  const isNew = useBoolean(false);

  return (
    <div className="col-span-1 aspect-[100/127] bg-[var(--bg-color)] flex rounded-lg">
      {!isNew.value ? (
        <Button
          size="none"
          onClick={isNew.onTrue}
          className="grow  flex flex-col items-center justify-center "
        >
          <Iconify icon="gg:add" width={30} />
          {t('add')}
        </Button>
      ) : (
        <div className="grow  flex flex-col items-center justify-center ">
          <div>
            <Input />
          </div>
          <div>
            <Button variant="error" onClick={isNew.onFalse}>
              {t('cancel')}
            </Button>
            <Button onClick={isNew.onFalse}>{t('add')}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewRoomButton;
