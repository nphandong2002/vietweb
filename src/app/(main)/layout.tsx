'use client';

import MainLayout from 'src/sections/layout/main';
import { defaultTypeLayout } from 'src/shared/types/layout';

function MainLayoutRoot({ children }: defaultTypeLayout) {
  return <MainLayout>{children}</MainLayout>;
}

export default MainLayoutRoot;
