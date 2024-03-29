import { defaultTypeLayout } from 'src/shared/types/layout';
import NavBar from './_compoment/navbar/navbar';
import CssInit from './css-init';

function MainLayout({ children }: defaultTypeLayout) {
  return (
    <main className="flex">
      <CssInit />
      <NavBar />
      <div className="grow md:mx-[var(--min-width-nav)] lg:mx-[var(--width-nav)]">{children}</div>
    </main>
  );
}

export default MainLayout;
