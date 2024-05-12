'use client';

import { useMemo } from 'react';
import { PATHS } from 'src/config';
import { useLocales } from 'src/locales';

import Image from 'src/sections/component/image';

const icon = (name: string) => (
  <Image src={`/assets/icons/navbar/${name}.svg`} height={30} width={30} alt={`nav_${name}`} />
);

export function useNavData() {
  const { t } = useLocales();
  const data = useMemo(
    () => [
      { title: t('home'), path: PATHS.home.root, icon: icon('ic_home') },
      { title: t('room.label'), path: PATHS.room.root, icon: icon('ic_room') },
      { title: t('setting'), path: PATHS.setting.root, icon: icon('ic_setting') },
      { title: t('pet.title'), path: PATHS.pet.root, icon: icon('ic_pet') },
    ],
    [t],
  );
  return data;
}
