import { defaultType } from 'src/shared/types/common';
import '@radix-ui/themes/styles.css';

import NavBar from './_component/navbar/navbar';
import CssInit from './_component/css/css-init';
import { useEventOnline } from 'src/shared/hooks/client/use-eventonline';

function MainLayout({ children }: defaultType) {
  useEventOnline();
  return (
    <main className="flex bg-[var(--bg-body)] h-screen ">
      <CssInit />
      <NavBar />
      <div className="grow md:ml-[var(--min-width-nav)] lg:ml-[var(--width-nav)]">
        <div className="m-4">{children}</div>
      </div>
    </main>
  );
}

export default MainLayout;
