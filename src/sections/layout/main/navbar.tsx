import { H_NAV, M_W_NAV, W_NAV } from "src/config";
import { cn } from "src/lib/utils";

function NavBar() {
  const sizeNav =  `h-[${H_NAV}px] sm:w-[${M_W_NAV}px] md:w-[${W_NAV}px]`;
  return (
    <nav className="fixed z-[90] bottom-0">
      <div className={"md:h-screen w-screen " + cn(sizeNav)}>
        <div className="flex flex-row md:flex-col">
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
