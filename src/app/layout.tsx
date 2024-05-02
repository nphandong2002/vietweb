//18n
import 'src/locales/i18n';

import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import './globals.css';

import { auth } from 'src/auth';
import { SITE } from 'src/config';
import { defaultLang } from 'src/locales';
import { defaultType } from 'src/shared/types/common';
import SettingProvider from 'src/shared/context/setting';
import { Toaster } from 'src/sections/component/ui/sonner';
import ProgressBar from 'src/sections/component/progress-bar';
import { localStorageGetItem } from 'src/shared/utils/storage-available';

export const metadata: Metadata = {
  title: { default: SITE || '', template: '%s | ' + SITE },
  description: 'VIETWEB hãy là chính bạn',
};

export default async function RootLayout({ children }: defaultType) {
  const lng = localStorageGetItem('i18nextLng', defaultLang.value);

  const session = await auth();

  return (
    <html lang={lng}>
      <SessionProvider session={session}>
        <SettingProvider
          defaultSetting={{
            theme: {
              mode: 'light',
              preset: '#d5e1ec',
            },
          }}
        >
          <Toaster />
          <ProgressBar />
          <body className="text-[var(--text-default)]">{children}</body>
        </SettingProvider>
      </SessionProvider>
    </html>
  );
}
