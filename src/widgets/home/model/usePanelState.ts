import { usePathname } from 'next/navigation';

export default function usePanelState() {
  const pathname = usePathname() ?? '';
  const section = pathname === '/chapters' ? 'Chapters' : 'Overview';
  return section
}
