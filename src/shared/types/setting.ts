export type SettingsContextProps = {
  data: SettingDataType;

  updateTheme: (name: string, updateValue: any) => void;
  onReset: () => void;
};

export type SettingDataType = {
  theme: DataThemeType;
};
export type DataThemeType = {
  mode: 'light' | 'dark';
  preset: any;
};
