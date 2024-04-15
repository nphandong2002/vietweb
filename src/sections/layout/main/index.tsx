import { defaultType } from 'src/shared/types/common';

import NavBar from './_component/navbar/navbar';
import CssInit from './_component/css/css-init';

function MainLayout({ children }: defaultType) {
  return (
    <main className="flex bg-[var(--bg-body)] h-screen text-[var(--cl-default)]">
      <CssInit />
      <NavBar />
      <div className="grow md:mx-[var(--min-width-nav)] lg:mx-[var(--width-nav)]">
        <div className="m-2">{children}</div>
      </div>
    </main>
  );
}

export default MainLayout;
