'use client';

import { alpha, decomposeColor } from 'src/lib/color';
import { useSettingsContext } from 'src/shared/context/setting';
import { H_NAV, M_W_NAV, W_NAV, h_NAV_ITEM, palette } from 'src/config';

import './css-global.scss';

function CssInit() {
  const {
    data: { theme },
  } = useSettingsContext();

  const paletteData = palette(theme.mode);

  return (
    <style>
      {`:root {
        --height-nav: ${H_NAV}px;
        --min-width-nav: ${M_W_NAV}px;
        --width-nav: ${W_NAV}px;
        --navitem-height: ${h_NAV_ITEM}px;

        --bg-default: ${theme.preset};
        --bg-body: ${paletteData.background.default};
        --bg-navbar: ${paletteData.background.default};
        --bg-color: ${paletteData.background.neutral};
        --bg-hover: ${alpha(theme.preset, 0.4)};
        --bg-active: ${alpha(theme.preset, 0.4)};
        --bg-primary:  ${theme.preset};

        --text-default: ${paletteData.text.primary};

        --text-error: ${paletteData.text.error};

        --border-width: 1px;
        --border-color-input: ${alpha(paletteData.background.neutral, 0.4)};
        --radius: 14px;

     }`}
    </style>
  );
}

export default CssInit;
