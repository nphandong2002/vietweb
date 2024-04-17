import { defaultType } from 'src/shared/types/common';

import NavBar from './_component/navbar/navbar';
import CssInit from './_component/css/css-init';

function MainLayout({ children }: defaultType) {
  return (
    <main className="flex bg-[var(--bg-body)] h-screen text-[var(--cl-default)]">
      <CssInit />
      <NavBar />
      <div className="grow md:ml-[var(--min-width-nav)] lg:ml-[var(--width-nav)]">
        <div className="m-4">{children}</div>
      </div>
    </main>
  );
}

export default MainLayout;
