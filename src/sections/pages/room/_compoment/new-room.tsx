'use client';

import { useForm } from 'react-hook-form';

import { useLocales } from 'src/locales';
import Iconify from 'src/sections/component/iconify';
import { Button } from 'src/sections/component/ui/button';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';
import RHFInput from 'src/sections/component/hook-form/rhf-input';
import RHFSelect from 'src/sections/component/hook-form/rhf-select';
import FormProvider from 'src/shared/context/form/form-provider';
import useTypeRoomData from './type-room-config';
import { roomValidate } from './room-validate';

function NewRoomButton() {
  const { t } = useLocales();
  const isNew = useBoolean(false);
  const dataOptions = useTypeRoomData();

  const methods = useForm({
    resolver: roomValidate,
  });
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

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
            <RHFInput name="name" placeholder={t('room.nameRoom.placeholder') as string} />
            <RHFSelect
              placeholder={t('room.type.placeholder') as string}
              options={dataOptions}
              name="type"
            />
            <div>
              <Button variant="error" onClick={isNew.onFalse}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('add')}</Button>
            </div>
          </div>
        </FormProvider>
      )}
    </div>
  );
}

export default NewRoomButton;
