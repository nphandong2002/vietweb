'use client';

import { useMemo } from 'react';
import { PATHS } from 'src/config';
import { useLocales } from 'src/locales';

import Image from 'src/sections/compoment/image';

const icon = (name: string) => (
  <Image src={`/assets/icons/navbar/${name}.svg`} height={30} width={30} alt={`nav_${name}`} />
);

export function useNavData() {
  const { t } = useLocales();
  const data = useMemo(
    () => [
      { title: t('home'), path: PATHS.home.root, icon: icon('ic_home') },
      { title: t('room'), path: PATHS.room.root, icon: icon('ic_room') },
      { title: t('setting'), path: PATHS.setting.root, icon: icon('ic_setting') },
    ],
    [t]
  );
  return data;
}
