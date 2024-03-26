"use client";
import classnames from "classnames";
import { H_NAV, M_W_NAV, W_NAV } from "src/config";
import { cn } from "src/lib/utils";
import { useNavData } from "./nav-data";
import Each from "src/sections/compoment/each";

function NavBar() {
  const sizeNav = classnames(`h-${H_NAV}px`, `md:w-${M_W_NAV}px`, `md:w-${W_NAV}px`, `md:h-screen`, `w-screen`);
  const useNavbar = useNavData();
  return (
    <nav className="fixed z-[90] bottom-0">
      <div className={sizeNav}>
        <div className="flex flex-row md:flex-col">
          <Each of={useNavbar} render={(item) => <div>{item.title}</div>} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
