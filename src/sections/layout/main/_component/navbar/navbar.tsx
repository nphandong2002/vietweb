import { useLocales } from 'src/locales';
import { Button } from 'src/sections/component/ui/button';

import NavbarList from './navbar-list';
import LoginModal from 'src/sections/component/auth/login-modal';
import RegisterModal from 'src/sections/component/auth/register-model';

function NavBar() {
  const { t } = useLocales();
  return (
    <nav className="fixed z-[90] bottom-0 bg-[var(--bg-navbar)]">
      <div className="border-r-gray-500 border-dashed border border-t-gray-500">
        <div className="md:h-screen w-screen h-[var(--height-nav)]  md:w-[var(--min-width-nav)] lg:w-[var(--width-nav)] flex flex-row md:flex-col justify-center">
          <NavbarList />
          <LoginModal />
          <RegisterModal />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
