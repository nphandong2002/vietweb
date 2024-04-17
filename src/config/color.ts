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
      error: '#e53935',
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
      error: '#e53935',
    },
    background: {
      paper: '#FFFFFF',
      default: 'rgb(22, 28, 36)',
      neutral: 'rgba(145, 158, 171, 0.12)',
    },
  };
  return mode == 'light' ? light : dark;
}
