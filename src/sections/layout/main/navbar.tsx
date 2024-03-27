'use client';

import NavbarList from "./navbar-list";


function NavBar() {



  return (
    <nav className="fixed z-[90] bottom-0">
      <div className="border-r-gray-500 border-dashed border border-t-gray-500">
        <div className="flex md:h-screen w-screen h-[var(--height-nav)] md:w-[var(--min-width-nav)] lg:w-[var(--width-nav)]">
          <div className="grow flex flex-row md:flex-col justify-center items-center">
            <NavbarList />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
