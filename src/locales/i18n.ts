'use client';

import { z } from 'zod';
import i18n from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// utils
import { localStorageGetItem } from 'src/shared/utils/storage-available';
//
import { defaultLang } from './config-lang';
//
import translationEn from './langs/en.json';
import translationFr from './langs/fr.json';
import translationVi from './langs/vi.json';
import translationCn from './langs/cn.json';
import translationAr from './langs/ar.json';

// ----------------------------------------------------------------------

const lng = localStorageGetItem('i18nextLng', defaultLang.value);
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: translationEn },
      fr: { translations: translationFr },
      vi: { translations: translationVi, zod: translationVi.validate },
      cn: { translations: translationCn },
      ar: { translations: translationAr },
    },
    lng,
    fallbackLng: lng,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

z.setErrorMap(zodI18nMap);
export default i18n;
