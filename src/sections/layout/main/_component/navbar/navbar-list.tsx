import Each from 'src/sections/component/each';

import { useNavData } from './nav-data';
import NavbarItem from './navbar-item';

function NavbarList() {
  const useNavbar = useNavData();
  return (
    <div className="grow overflow-auto flex flex-row md:flex-col">
      <Each
        of={useNavbar}
        render={(item) => <NavbarItem title={item.title} icon={item.icon} path={item.path} />}
      />
    </div>
  );
}

export default NavbarList;
