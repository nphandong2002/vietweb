import { defaultTypeLayout } from 'src/shared/types/layout';
import NavBar from './navbar';
import CssInit from './css-init';

function MainLayout({ children }: defaultTypeLayout) {
  return (
    <main className="flex">
      <CssInit />
      <NavBar />
      {children}
    </main>
  );
}

export default MainLayout;
