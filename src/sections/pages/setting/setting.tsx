'use client';

import { useLocales } from 'src/locales';
import Color from './_compoment/color';
import Language from './_compoment/lang';

function SettingPage() {
  const { t } = useLocales();
  return (
    <>
      <Language />
      <Color />
      <div>
        <div>{t('mode')}</div>
        <div></div>
      </div>
    </>
  );
}

export default SettingPage;
