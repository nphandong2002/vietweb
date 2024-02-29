"use client";

import { useTranslation } from "react-i18next";
import { useCallback } from "react";
// utils
import { localStorageGetItem } from "@/utils/storage-available";
// components
//
import { allLangs, defaultLang } from "./config-lang";
import { useSettingsContext } from "@/context/settings";

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t } = useTranslation();

  const settings = useSettingsContext();

  const langStorage = localStorageGetItem("i18nextLng");

  const currentLang =
    allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
    },
    [i18n, settings],
  );

  return {
    allLangs,
    t,
    currentLang,
    onChangeLang,
  };
}
