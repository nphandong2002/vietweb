import { ChangeEvent } from 'react';
import { useLocales } from 'src/locales';

function Color() {
  const { t } = useLocales();
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event?.target.value;
  };
  return (
    <div>
      <div>{t('color')}</div>
      <input type="color" onChange={handleChangeColor} />
    </div>
  );
}

export default Color;
