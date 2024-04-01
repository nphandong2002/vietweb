import 'src/locales/i18n';

import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Metadata } from 'next';
import './globals.css';
import { SITE } from 'src/config';
import { defaultTypeLayout } from 'src/shared/types/layout';

export const metadata: Metadata = {
  title: { default: SITE || '', template: '%s | ' + SITE },
  description: 'VIETWEB hãy là chính bạn',
};

export default function RootLayout({ children }: defaultTypeLayout) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
