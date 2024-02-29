"use client";

import isEqual from "lodash/isEqual";

import { useEffect, useMemo, useCallback, useState } from "react";
// hooks
import { useLocalStorage } from "@/hooks/use-local-storage";

//
import { SettingsValueProps } from "./types";
import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(
    STORAGE_KEY,
    defaultSettings,
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const canReset = !isEqual(state, defaultSettings);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...state,

      onUpdate: update,
      canReset,
      onReset: reset,

      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [reset, update, state, canReset, openDrawer, onCloseDrawer, onToggleDrawer],
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
