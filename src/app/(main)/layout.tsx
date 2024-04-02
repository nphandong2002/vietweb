'use client';

import MainLayout from 'src/sections/layout/main';
import { defaultType } from 'src/shared/types/common';

function MainLayoutRoot({ children }: defaultType) {
  return <MainLayout>{children}</MainLayout>;
}

export default MainLayoutRoot;
