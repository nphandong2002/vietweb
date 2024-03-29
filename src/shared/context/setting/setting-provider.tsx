import { useMemo } from 'react';
import { useLocalStorage } from 'src/shared/hooks/client/use-local-storage';
import { SettingsContext } from './setting-context';
import { defaultTypeLayout } from 'src/shared/types/layout';

const STORAGE_KEY = 'settings';

function SettingProvider({ children }: defaultTypeLayout) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, {});
  const memoizedValue = useMemo(
    () => ({
      data: state,

      onUpdate: update,
      onReset: reset,
    }),
    [update, reset]
  );
  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

export default SettingProvider;
