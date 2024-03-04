"use client";

import merge from "lodash/merge";
import { useMemo } from "react";
// @mui
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
// locales
import { useLocales } from "@/locales";
// components
// system
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
// options
import { presets } from "./options/presets";
import { darkMode } from "./options/dark-mode";
import { contrast } from "./options/contrast";
//
import NextAppDirEmotionCacheProvider from "./next-emotion-cache";
import { useSettingsContext } from "../settings";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();

  const settings = useSettingsContext();

  const darkModeOption = darkMode(settings.theme.mode);

  const presetsOption = presets(settings.theme.color);

  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      customShadows: customShadows("light"),
      typography,
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
      ),
    [baseOption, darkModeOption, presetsOption],
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = componentsOverrides(theme);

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme],
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={themeWithLocale}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
