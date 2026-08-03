import { Background } from '@/src/widgets/home/ui/Background';
import { Panel } from '@/src/widgets/home/ui/Panel';
import ChapterList from '@/src/widgets/chapter-list/ui/ChapterList';

export default function Chapters() {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#010407]">
      <Background />
      <Panel />
      <ChapterList />
    </main>
  );
}
