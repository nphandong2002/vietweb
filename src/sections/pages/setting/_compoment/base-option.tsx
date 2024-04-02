import { useLocales } from "src/locales";

type Props = {
  icons: string[];
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
};
function BaseOption({ icons, options, value, onChange }: Props) {
    const {
    t,
    allLangs,
    currentLang: { value: currentLangValue },
    onChangeLang,
  } = useLocales();
    return <div>{t('language')}</div>
      <div className="flex flex-row">
        <Each
          of={allLangs}
          render={({ icon, value }) => (
            <IconButton active={value === currentLangValue} onClick={() => onChangeLang(value)}>
              <Iconify icon={icon} width={24} />
            </IconButton>
          )}
        />
      </div>;
}

export default BaseOption;