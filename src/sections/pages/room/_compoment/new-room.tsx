'use client';

import { useForm } from 'react-hook-form';
import { useLocales } from 'src/locales';
import FormProvider from 'src/sections/component/hook-form/form-provider';
import Iconify from 'src/sections/component/iconify';
import RHFSelect from 'src/sections/component/hook-form/rhf-select';
import { Button } from 'src/sections/component/ui/button';
import { Input } from 'src/sections/component/ui/input';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';

function NewRoomButton() {
  const { t } = useLocales();
  const isNew = useBoolean(false);
  const methods = useForm();
  const onSubmit = () => {};

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
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="grow  flex flex-col items-center justify-center ">
            <div className="px-2 py-3 w-full">
              <Input placeholder={t('room.new.placeholder')} />
            </div>
            <RHFSelect
              options={[
                {
                  label: t('room.type.draw'),
                  value: 'draw',
                },
              ]}
              name="type"
            />
            <div>
              <Button variant="error" onClick={isNew.onFalse}>
                {t('cancel')}
              </Button>
              <Button onClick={isNew.onFalse}>{t('add')}</Button>
            </div>
          </div>
        </FormProvider>
      )}
    </div>
  );
}

export default NewRoomButton;
