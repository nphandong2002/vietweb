import SvgColor from "@/compoments/svg-color";
import { useSettingsContext } from "@/context/settings";
import { useLocales } from "@/locales";
import { paths } from "@/routes/paths";
import { useMemo } from "react";

export const heightNav = "50px";
export const widthNav = "100px";

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
export function useNavData() {
  const { t } = useLocales();
  const setting = useSettingsContext();
  const data = useMemo(
    () => [
      { title: t("home"), icon: icon("ic_home"), path: paths.home },
      { title: t("game"), icon: icon("ic_chat"), path: paths.game },
      { title: t("message"), icon: icon("ic_chat"), path: paths.message },
      { title: t("video"), icon: icon("ic_chat"), path: paths.video },
      { title: t("music"), icon: icon("ic_chat"), path: paths.music },
      { title: t("setting"), icon: icon("ic_chat"), onClick: setting.onToggle },
    ],
    [t],
  );
}
