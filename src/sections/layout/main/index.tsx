import { defaultTypeLayout } from 'src/shared/types/layout';
import NavBar from './navbar';

function MainLayout({ children }: defaultTypeLayout) {
  return (
    <main className="flex">
      <NavBar />
      {children}
    </main>
  );
}

export default MainLayout;
