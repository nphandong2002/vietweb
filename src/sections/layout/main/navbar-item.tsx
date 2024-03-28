import Link from 'next/link';
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
  const active = useActiveLink(path);

  return (
    <div className="min-h-[var(--navitem-height,40px)] bg-[var(--)]">
      <Link className="flex justify-center lg:justify-start items-center" href={path}>
        <div className="m-2">{icon}</div>
        <div className="hidden overflow-hidden text-ellipsis lg:inline-block ">
          {title + title + title + title}
        </div>
      </Link>
    </div>
  );
}

export default NavbarItem;
