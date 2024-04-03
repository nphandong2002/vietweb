//18n
import 'src/locales/i18n';

import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import './globals.css';
import { SITE } from 'src/config';
import SettingProvider from 'src/shared/context/setting';
import { defaultType } from 'src/shared/types/common';
import ProgressBar from 'src/sections/compoment/progress-bar';
import { localStorageGetItem } from 'src/shared/utils/storage-available';
import { defaultLang } from 'src/locales';

export const metadata: Metadata = {
  title: { default: SITE || '', template: '%s | ' + SITE },
  description: 'VIETWEB hãy là chính bạn',
};

export default function RootLayout({ children }: defaultType) {
  const lng = localStorageGetItem('i18nextLng', defaultLang.value);

  return (
    <html lang={lng}>
      <SettingProvider
        defaultSetting={{
          theme: {
            mode: 'light',
            preset: '#d5e1ec',
          },
        }}
      >
        <ProgressBar />
        <body>{children}</body>
      </SettingProvider>
    </html>
  );
}
