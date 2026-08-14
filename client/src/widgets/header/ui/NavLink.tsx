import Link from 'next/link';
import { ElementType } from 'react';

type NavLinkProps = {
  href: string;
  title: string;
  className?: string;
  spanClassName?: string;
  as?: ElementType;
};

export const NavLink = ({
  href,
  title,
  className,
  spanClassName,
  as: Component = 'span',
}: NavLinkProps) => {
  return (
    <Link href={href} className={`${className} group relative block`}>
      <Component>{title}</Component>
      <span
        className={`absolute bottom-0 left-0 hidden h-[2px] w-0 origin-left bg-black duration-300 group-hover:w-[102%] lg:inline dark:bg-white ${spanClassName}`}
      ></span>
    </Link>
  );
};
