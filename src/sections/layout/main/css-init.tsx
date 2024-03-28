'use client';

import { H_NAV, M_W_NAV, W_NAV, h_NAV_ITEM } from 'src/config';

function CssInit() {
  return (
    <style>
      {`:root {
        --height-nav: ${H_NAV}px;
        --min-width-nav: ${M_W_NAV}px;
        --width-nav: ${W_NAV}px;
        --navitem-height: ${h_NAV_ITEM}px;
     }`}
    </style>
  );
}

export default CssInit;
