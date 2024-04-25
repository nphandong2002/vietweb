'use client';

import { useState, useTransition } from 'react';
import { RoomType } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { useLocales } from 'src/locales';
import { create } from 'src/service/room';
import Iconify from 'src/sections/component/iconify';
import { generateAvatar } from 'src/shared/utils/avatar';
import { Button } from 'src/sections/component/ui/button';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';
import FormProvider from 'src/shared/context/form/form-provider';
import RHFInput from 'src/sections/component/hook-form/rhf-input';
import { useCurrentUser } from 'src/shared/hooks/client/use-user';
import RHFSelect from 'src/sections/component/hook-form/rhf-select';

import useTypeRoomData from './type-room-config';
import { roomValidate } from './room-validate';
import { FormError } from 'src/sections/component/hook-form/form-error';
import { MESSAGE } from 'src/shared/constain/message';

function NewRoomButton() {
  const { t } = useLocales();
  const user = useCurrentUser();
  const isNew = useBoolean(false);
  const dataOptions = useTypeRoomData();
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const methods = useForm({
    resolver: roomValidate,
    defaultValues: {
      name: '',
      type: 'draw',
    },
  });
  const onSubmit = methods.handleSubmit((data) => {
    let image = generateAvatar(data.name, 'room');
    startTransition(() => {
      create({
        title: data.name,
        type: data.type as RoomType,
        authorId: user?.id || '0',
        image,
      })
        .then((_) => {
          methods.reset();
        })
        .then((_) => setError(MESSAGE.ERROR.WRONG));
    });
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
          <div className="grow  flex flex-col items-center justify-center py-5">
            <div className="text-center mb-2">{t('room.create')}</div>
            <FormError message={error && t(`messages_app.${error}`)} />
            <RHFInput name="name" placeholder={t('room.nameRoom.placeholder') as string} />
            <RHFSelect
              placeholder={t('room.type.placeholder') as string}
              options={dataOptions}
              name="type"
            />
            <div>
              <Button variant="error" disabled={isPending} onClick={isNew.onFalse}>
                {t('cancel')}
              </Button>
              <Button disabled={isPending} type="submit">
                {t('add')}
              </Button>
            </div>
          </div>
        </FormProvider>
      )}
    </div>
  );
}

export default NewRoomButton;
