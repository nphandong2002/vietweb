import 'src/lib/locales/i18n';


import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from 'src/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: SITE || "", template: "%s | " + SITE },
  description: 'VIETWEB hãy là chính bạn',
  themeColor: '#000000',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
