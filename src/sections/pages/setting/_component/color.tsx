'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useLocales } from 'src/locales';
import { useSettingsContext } from 'src/shared/context/setting';
import { useDebounce } from 'src/shared/hooks/client/use-debounce';

function Color() {
  const { t } = useLocales();
  const {
    updateTheme,
    data: {
      theme: { preset },
    },
  } = useSettingsContext();
  const [valueColor, setvalueColor] = useState(preset);
  const debouncedValue = useDebounce(valueColor, 500);
  useEffect(() => {
    updateTheme('preset', debouncedValue);
  }, [debouncedValue]);

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event?.target.value;
    setvalueColor(color);
  };
  return (
    <div>
      <div>{t('color')}</div>
      <input type="color" onChange={handleChangeColor} value={valueColor} />
    </div>
  );
}

export default Color;
