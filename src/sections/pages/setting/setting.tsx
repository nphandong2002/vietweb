'use client';

import { useLocales } from 'src/locales';
import Color from './_component/color';
import Language from './_component/lang';
import BaseOption from './_component/base-option';
import { useSettingsContext } from 'src/shared/context/setting';

function SettingPage() {
  const { t } = useLocales();
  const { data, updateTheme } = useSettingsContext();
  return (
    <>
      <Language />
      <Color />
      <BaseOption
        label="mode"
        onChange={(value) => updateTheme('mode', value)}
        value={data.theme.mode}
        fillColor="#fbff00"
        options={[
          {
            icon: 'fa-solid:sun',
            value: 'light',
          },
          {
            icon: 'bi:moon-fill',
            value: 'dark',
          },
        ]}
      />
    </>
  );
}

export default SettingPage;
