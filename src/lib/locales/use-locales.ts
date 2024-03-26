'use client';

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
// utils
import { localStorageGetItem } from 'src/shared/utils/storage-available';

//
import { allLangs, defaultLang } from './config-lang';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t } = useTranslation();
  const onChangeDirectionByLang = (a: any)=>{};

  const langStorage = localStorageGetItem('i18nextLng');

  const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      onChangeDirectionByLang(newlang);
    },
    [i18n,onChangeDirectionByLang]
  );

  return {
    allLangs,
    t,
    currentLang,
    onChangeLang,
  };
}
