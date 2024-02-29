"use client";

import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from "@mui/material";

import NextAppDirEmotionCacheProvider from "./next-emotion-cache";
import { ThemeContextType, ThemeValue } from "./types";

import { useAuthContext } from "../hooks/use-auth-context";
import { useCallback, useMemo } from "react";
import { ThemeContext } from "@emotion/react";
import { useLocalStorage } from "@/hooks/use-local-storage";

type ThemeOptionsProps = {
  children: React.ReactNode;
  defaultSettings: ThemeValue;
};
const STORAGE_KEY = "theme";

export function ThemeProvider({
  children,
  defaultSettings,
}: ThemeOptionsProps) {
  const { authenticated } = useAuthContext();
  const { state, update, reset } = useLocalStorage(
    STORAGE_KEY,
    defaultSettings,
  );

  const onUpdate = useCallback(authenticated ? update : () => {}, [
    authenticated,
  ]);

  const memoizedValue = useMemo(
    () => ({ theme: state || {}, onUpdate }),
    [state, onUpdate],
  );

  return (
    <ThemeContext.Provider value={memoizedValue}>
      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        {children}
      </NextAppDirEmotionCacheProvider>
    </ThemeContext.Provider>
  );
}
