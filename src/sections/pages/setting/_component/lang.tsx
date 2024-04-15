import { useLocales } from 'src/locales';
import BaseOption from './base-option';

function Language() {
  const { t, allLangs, currentLang, onChangeLang } = useLocales();
  return (
    <BaseOption
      options={allLangs}
      label="language"
      value={currentLang.value}
      onChange={onChangeLang}
    />
  );
}

export default Language;
