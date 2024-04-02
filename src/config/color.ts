export const primaryPresets = [
  {
    name: 'default',
  },
];

export function palette(mode: 'light' | 'dark') {
  const light = {
    text: {
      primary: '#161C24',
      secondary: '#637381',
      disabled: '#919EAB',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: '#F4F6F8',
    },
  };
  const dark = {
    text: {
      primary: '#FFFFFF',
      secondary: '#637381',
      disabled: '#919EAB',
    },
    background: {
      paper: '#FFFFFF',
      default: '#676767',
      neutral: '#F4F6F8',
    },
  };
  return mode == 'light' ? light : dark;
}
