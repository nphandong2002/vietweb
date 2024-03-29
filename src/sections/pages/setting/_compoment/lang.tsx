'use client';

import { useLocales } from 'src/lib/locales';
import Each from 'src/sections/compoment/each';
import IconButton from 'src/sections/compoment/icon-button';
import Iconify from 'src/sections/compoment/iconify';

function Language() {
  const {
    t,
    allLangs,
    currentLang: { value: currentLangValue },
    onChangeLang,
  } = useLocales();

  return (
    <div>
      <div>{t('language')}</div>
      <div className="flex flex-row">
        <Each
          of={allLangs}
          render={({ icon, value }) => (
            <IconButton active={value === currentLangValue} onClick={() => onChangeLang(value)}>
              <Iconify icon={icon} width={24} />
            </IconButton>
          )}
        />
      </div>
    </div>
  );
}

export default Language;
