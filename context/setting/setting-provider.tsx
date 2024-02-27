"use client";

import { useLocalStorage } from "@/hooks/user-local-storage";
import { SettingsContext } from "./setting-context";
import { SettingsValueProps } from "./types";
import { useMemo } from "react";
const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const memoizedValue = useMemo(() => ({ ...state }), []);

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
