export type ThemeFont =
  | "Roboto"
  | "Open Sans"
  | "Lato"
  | "Montserrat"
  | "Roboto Slab"
  | "Source Sans Pro"
  | "Poppins"
  | "Nunito"
  | "Merriweather"
  | "Oswald"
  | "Raleway"
  | "Roboto Condensed"
  | "Roboto Mono"
  | "Ubuntu"
  | "Playfair Display"
  | "Work Sans"
  | "Crimson Pro"
  | "IBM Plex Sans"
  | "IBM Plex Serif"
  | "IBM Plex Mono"
  | "Inter"
  | "Noto Sans"
  | "Noto Serif"
  | "Noto Sans JP"
  | "Noto Serif JP"
  | "Noto Sans KR"
  | "Noto Serif KR"
  | "Noto Sans SC"
  | "Noto Serif SC"
  | "Noto Sans TC"
  | "Noto Serif TC"
  | "Noto Sans Arabic"
  | "Noto Serif Arabic"
  | "Noto Sans Devanagari"
  | "Noto Serif Devanagari"
  | "Noto Sans Bengali"
  | "Noto Serif Bengali"
  | "Noto Sans Gujarati"
  | "Noto Serif Gujarati"
  | "Noto Sans Gurmukhi"
  | "Noto Serif Gurmukhi"
  | "Noto Sans Kannada"
  | "Noto Serif Kannada"
  | "Noto Sans Malayalam"
  | "Noto Serif Malayalam"
  | "Noto Sans Tamil"
  | "Noto Serif Tamil"
  | "Noto Sans Telugu"
  | "Noto Serif Telugu"
  | "Noto Sans Thai"
  | "Noto Serif Thai"
  | "Noto Sans Myanmar"
  | "Noto Serif Myanmar"
  | "Noto Sans Khmer"
  | "Noto Serif Khmer"
  | "Noto Sans Lao"
  | "Noto Serif Lao"
  | "Noto Sans Tibetan"
  | "Noto Serif Tibetan"
  | "Noto Sans Georgian"
  | "Noto Serif Georgian"
  | "Noto Sans Armenian"
  | "Noto Serif Armenian"
  | "Noto Sans Ethiopic"
  | "Noto Serif Ethiopic"
  | "Noto Sans Sinhala"
  | "Noto Serif Sinhala"
  | "Noto Sans Devanagari UI"
  | "Noto Serif Devanagari UI"
  | "Noto Sans Bengali UI"
  | "Noto Serif Bengali UI"
  | "Noto Sans Gujarati UI"
  | "Noto Serif Gujarati UI"
  | "Noto Sans Gurmukhi UI"
  | "Noto Serif Gurmukhi UI"
  | "Noto Sans Kannada UI"
  | "Noto Serif Kannada UI"
  | "Noto Sans Malayalam UI"
  | "Noto Serif Malayalam UI"
  | "Noto Sans Tamil UI"
  | "Noto Serif Tamil UI"
  | "Noto Sans Telugu UI"
  | "Noto Serif Telugu UI"
  | "Noto Sans Thai UI"
  | "Noto Serif Thai UI"
  | "Noto Sans Myanmar UI"
  | "Noto Serif Myanmar UI"
  | "Noto Sans Khmer UI"
  | "Noto Serif Khmer UI"
  | "Noto Sans Lao UI"
  | "Noto Serif Lao UI"
  | "Noto Sans Tibetan UI"
  | "Noto Serif Tibetan UI"
  | "Noto Sans Georgian UI"
  | "Noto Serif Georgian UI"
  | "Noto Sans Armenian UI"
  | "Noto Serif Armenian UI"
  | "Noto Sans Ethiopic UI"
  | "Noto Serif Ethiopic UI"
  | "Noto Sans Sinhala UI"
  | "Noto Serif Sinhala UI";

export type SettingsValueProps = {
  theme: {
    mode: "light" | "dark";
    font: ThemeFont;
    color: "default" | "cyan" | "purple" | "blue" | "orange" | "red";
  };
};

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: any) => void;
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void;
  // Reset
  canReset: boolean;
  onReset: VoidFunction;
  // Drawer
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
