import Link from 'next/link';
import { ElementType } from 'react';

type NavLinkProps = {
  href: string,
  title: string,
  className?: string,
  as?: ElementType;
};

export function NavLink({ href, title, className, as: Component = "span" }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${className} group relative block`}
    >
      <Component>{title}</Component>
      <span
        className={`hidden lg:inline absolute left-0 bottom-0 origin-left h-[2px] w-0 group-hover:w-[102%] bg-white duration-300 `}
      ></span>
    </Link>
  )
}
