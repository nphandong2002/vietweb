"use client";

import { useMemo } from "react";

import { paths } from "@/router/path";
import { useLocales } from "@/locales";
import Image from "@/components/image";
import { useSettingsContext } from "@/context/settings";

const icon = (name: string) => (
  <Image
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

function useNavbar() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const data = useMemo(
    () => [
      { title: t("home"), icon: icon("ic_home"), path: paths.home.root },
      { title: t("game"), icon: icon("ic_chat"), path: paths.game.root },
      { title: t("message"), icon: icon("ic_chat"), path: paths.message.root },
      { title: t("video"), icon: icon("ic_chat"), path: paths.video.root },
      { title: t("music"), icon: icon("ic_chat"), path: paths.music.root },
      { title: t("note"), icon: icon("ic_chat"), path: paths.note.root },
      {
        title: t("setting"),
        icon: icon("ic_setting"),
        onClick: settings.onToggle,
      },
    ],
    [],
  );
  return data;
}

export default useNavbar;
