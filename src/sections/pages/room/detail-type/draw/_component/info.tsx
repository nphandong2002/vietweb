'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { useEffect, useState, useTransition } from 'react';
import { getInfo, renameRoom } from 'src/database/room/room';
import { RoomInfo } from 'src/shared/types/room';
import { Hint } from 'src/sections/component/hint';
import { Button } from 'src/sections/component/ui/button';
import { cn } from 'src/lib/utils';
import { Actions } from './actions';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';
import { useLocales } from 'src/locales';
import { CustomModal } from 'src/sections/component/modal';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/shared/context/form/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RHFInput from 'src/sections/component/hook-form/rhf-input';
import { useMutation, useStorage } from 'src/liveblocks.config';
import { typeAction } from 'src/shared/types/liveblock';
import { LiveObject } from '@liveblocks/client';

interface InfoProps {
  roomId: string;
}

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ roomId }: InfoProps) => {
  const { t } = useLocales();
  const modalRename = useBoolean();
  const [data, setdata] = useState<RoomInfo | null>();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1),
      }),
    ),
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      renameRoom(roomId, data.title);
    });
  });

  useEffect(() => {
    form.setValue('title', data?.title || '');
  }, [data, form]);
  useEffect(() => {
    const fetchData = async () => {
      const roomInfo = await getInfo(roomId);
      setdata(roomInfo);
    };

    fetchData();
  }, [roomId]);
  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-[4.25rem] bg-[var(--bg-color)] rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label={t('room.rename')} side="bottom" sideOffset={10}>
        <Button variant="board" className="text-base font-normal px-2" onClick={() => modalRename.onTrue()}>
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data.id} title={data.title} side="bottom" sideOffset={10} openModal={modalRename.onTrue}>
        <div>
          <Button size="icon" variant="board">
            <Menu />
          </Button>
        </div>
      </Actions>
      <CustomModal
        open={modalRename.value}
        onClose={modalRename.onFalse}
        title={t('room.rename')}
        isPending={isPending}
        content={
          <FormProvider methods={form} onSubmit={onSubmit}>
            <RHFInput name="title" placeholder={t('room.nameRoom.placeholder')} />
          </FormProvider>
        }
        action={
          <Button onClick={onSubmit} disabled={isPending} variant="secondary">
            {t('confirm')}
          </Button>
        }
      />
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-[var(--bg-color)] rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
