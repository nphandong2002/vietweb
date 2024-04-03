import { useLocales } from 'src/locales';
import Each from 'src/sections/compoment/each';
import IconButton from 'src/sections/compoment/icon-button';
import Iconify from 'src/sections/compoment/iconify';

type Props = {
  label: string;
  options: { icon: string; value: string }[];
  value: string;
  fillColor?: string;
  onChange: (newValue: string) => void;
};
function BaseOption({ fillColor, label, options, value: mode, onChange }: Props) {
  const { t } = useLocales();
  return (
    <div>
      <div>{t(label)}</div>
      <div className="flex flex-row">
        <Each
          of={options}
          render={({ icon, value }) => (
            <IconButton active={value === mode} onClick={() => onChange(value)}>
              <Iconify
                icon={icon}
                width={24}
                style={{
                  ...(fillColor &&
                    value === mode && {
                      color: fillColor,
                    }),
                }}
              />
            </IconButton>
          )}
        />
      </div>
    </div>
  );
}

export default BaseOption;
