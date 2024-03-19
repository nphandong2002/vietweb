import "@/locales/i18n";

import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";

import { TITLE } from "@/config-global";
import ConvexProvider from "@/context/convex";
import { SplashScreen } from "@/components/loading-screen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: TITLE || "", template: "%s | " + TITLE },
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<SplashScreen />}>
          <ConvexProvider>{children}</ConvexProvider>
        </Suspense>
      </body>
    </html>
  );
}
