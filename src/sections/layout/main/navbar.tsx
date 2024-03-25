import { H_NAV } from 'src/config';
import { cn } from 'src/lib/utils';

function NavBar() {
  return (
    <nav className="fixed z-[90] bottom-0">
      <div className={'md:h-screen w-screen' + cn(`h-[${H_NAV}px]`)}>
        <div className="flex flex-row md:flex-col"> navbar</div>
      </div>
    </nav>
  );
}

export default NavBar;
