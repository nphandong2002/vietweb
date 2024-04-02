'use client';

import { useLocales } from 'src/locales';
import Color from './_compoment/color';
import Language from './_compoment/lang';
import BaseOption from './_compoment/base-option';
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
        options={[
          {
            icon: 'twemoji:sun',
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
