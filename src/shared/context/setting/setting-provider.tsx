'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'src/shared/hooks/client/use-local-storage';
import { SettingsContext } from './setting-context';
import { defaultType } from 'src/shared/types/common';
import { SettingDataType } from 'src/shared/types/setting';

const STORAGE_KEY = 'settings';

type SettingProviderType = defaultType & {
  defaultSetting: SettingDataType;
};

function SettingProvider({ children, defaultSetting }: SettingProviderType) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSetting);

  const updateTheme = useCallback(
    (name: any, value: any) => {
      update('theme', {
        ...state.theme,
        [name]: value,
      });
    },
    [update, state]
  );
  const memoizedValue = useMemo(
    () => ({
      data: state,

      updateTheme: updateTheme,
      onReset: reset,
    }),
    [updateTheme, reset, state]
  );
  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

export default SettingProvider;
