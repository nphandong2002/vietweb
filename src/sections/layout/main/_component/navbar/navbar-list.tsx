import Each from 'src/sections/component/each';

import { useNavData } from './nav-data';
import NavbarItem from './navbar-item';
import { ScrollArea } from 'src/sections/component/ui/scroll-area';

function NavbarList() {
  const useNavbar = useNavData();
  return (
    <ScrollArea className="grow ">
      <div className='flex flex-row md:flex-col'>
        <Each
          of={useNavbar}
          render={(item) => <NavbarItem title={item.title} icon={item.icon} path={item.path} />}
        />
      </div>
    </ScrollArea>
  );
}

export default NavbarList;
