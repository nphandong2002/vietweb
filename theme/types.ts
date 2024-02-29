export type ThemeValue = {
  themeStretch: boolean;
  themeMode: "light" | "dark";
  themeDirection: "rtl" | "ltr";
  themeContrast: "default" | "bold";
  themeLayout: "vertical" | "horizontal" | "mini";
  themeColorPresets: "default" | "cyan" | "purple" | "blue" | "orange" | "red";
};
export type ThemeContextType = {
  theme: ThemeValue;
  onUpdate: (name: string, value: string | boolean) => void;
  canReset: boolean;
  onReset: VoidFunction;
};
