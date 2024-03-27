import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Each from 'src/sections/compoment/each';

import { useNavData } from './nav-data';
import NavbarItem from './navbar-item';

function NavbarList() {
  const useNavbar = useNavData();
  return <Each of={useNavbar} render={(item) => <NavbarItem title={item.title} icon={item.icon} path={item.path} />} />;
}

export default NavbarList;
