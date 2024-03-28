"use client";

import { useMemo } from "react";
import { PATHS } from "src/config";
import { useLocales } from "src/lib/locales";

import Image from "src/sections/compoment/image";

const icon = (name: string) => <Image src={`/assets/icons/navbar/${name}.svg`} height={30} width={30}/>;

export function useNavData() {
  const { t } = useLocales();
  const data = useMemo(() => [
    { title: t("home"), path: PATHS.home.root, icon: icon("ic_home") },

  ], [t]);
  return data;
}
