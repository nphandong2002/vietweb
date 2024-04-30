'use client';
import {
  enUS as enUSAdapter,
  fr as frFRAdapter,
  vi as viVNAdapter,
  zhCN as zhCNAdapter,
  arSA as arSAAdapter,
} from 'date-fns/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'French',
    value: 'fr',
    adapterLocale: frFRAdapter,
    icon: 'flagpack:fr',
  },
  {
    label: 'Vietnamese',
    adapterLocale: viVNAdapter,
    value: 'vi',
    icon: 'flagpack:vn',
  },
  {
    label: 'Chinese',
    adapterLocale: zhCNAdapter,
    value: 'cn',
    icon: 'flagpack:cn',
  },
  {
    label: 'Arabic',
    adapterLocale: arSAAdapter,
    value: 'ar',
    icon: 'flagpack:sa',
  },
];

export const defaultLang = allLangs[2]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
