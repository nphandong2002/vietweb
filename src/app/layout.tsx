//18n
import 'src/locales/i18n';

import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import './globals.css';
import { SITE } from 'src/config';
import SettingProvider from 'src/shared/context/setting';
import { defaultType } from 'src/shared/types/common';

export const metadata: Metadata = {
  title: { default: SITE || '', template: '%s | ' + SITE },
  description: 'VIETWEB hãy là chính bạn',
};

export default function RootLayout({ children }: defaultType) {
  return (
    <html lang="en">
      <SettingProvider
        defaultSetting={{
          theme: {
            mode: 'light',
            preset: '#d5e1ec',
          },
        }}
      >
        <body>{children}</body>
      </SettingProvider>
    </html>
  );
}
