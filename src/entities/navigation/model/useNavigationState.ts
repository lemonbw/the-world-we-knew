'use client';
import { usePathname } from 'next/navigation';

export const useNavigationState = () => {
  const pathname = usePathname() ?? '';
  const section =
    pathname === '/chapters' || pathname.startsWith('/reading/')
      ? 'Chapters'
      : 'Overview';
  return section;
};
