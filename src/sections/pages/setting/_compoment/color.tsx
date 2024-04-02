'use client';

import { ChangeEvent } from 'react';
import { useLocales } from 'src/locales';
import { useSettingsContext } from 'src/shared/context/setting';

function Color() {
  const { t } = useLocales();
  const {
    updateTheme,
    data: {
      theme: { preset },
    },
  } = useSettingsContext();
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event?.target.value;
    updateTheme('preset', color);
  };
  return (
    <div>
      <div>{t('color')}</div>
      <input type="color" onChange={handleChangeColor} value={preset} />
    </div>
  );
}

export default Color;
