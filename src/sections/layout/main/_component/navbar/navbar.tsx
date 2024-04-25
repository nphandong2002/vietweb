'use client';

import { useLocales } from 'src/locales';
import Image from 'src/sections/component/image';
import { generateAvatar } from 'src/shared/utils/avatar';
import LoginModal from 'src/sections/component/auth/login-modal';
import { useCurrentUser } from 'src/shared/hooks/client/use-user';
import RegisterModal from 'src/sections/component/auth/register-model';

import NavbarList from './navbar-list';

function NavBar() {
  const { t } = useLocales();
  const user = useCurrentUser();

  return (
    <nav className="fixed z-[90] bottom-0 bg-[var(--bg-navbar)]">
      <div className="border-r-gray-500 border-dashed border border-t-gray-500">
        <div className="md:h-screen w-screen h-[var(--height-nav)]  md:w-[var(--min-width-nav)] lg:w-[var(--width-nav)] flex flex-row md:flex-col justify-center">
          <NavbarList />
          {!user && (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          )}
          {user && (
            <div className="flex flex-row space-x-2 p-2 items-center">
              <div className="rounded-full">
                <Image
                  src={user.image || generateAvatar(user.name || '')}
                  alt="nav_user_avatar"
                  width={36}
                  height={36}
                />
              </div>
              <div className="hidden md:block">{user.name}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
