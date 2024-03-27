import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActiveLink } from 'src/shared/hooks/router/use-active-link';

export type NavItemProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

function NavbarItem({ title, path, icon }: NavItemProps) {
  const pathname = usePathname();
  const active = useActiveLink(path);

  return (
    <div>
      <Link className="flex w-full justify-center lg:justify-start items-center" href={path}>
        <div>{icon}</div>
        <span className="hidden lg:inline-block">{title}</span>
      </Link>
    </div>
  );
}

export default NavbarItem;
