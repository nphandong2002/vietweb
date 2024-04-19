import { useMemo } from 'react';
import { useLocales } from 'src/locales';

function useTypeRoomData() {
  const { t } = useLocales();
  const data = useMemo(
    () => [
      {
        label: t('room.type.draw'),
        value: 'draw',
      },
    ],
    [t]
  );
  return data;
}

export default useTypeRoomData;
