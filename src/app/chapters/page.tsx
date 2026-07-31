import Background from '@/src/features/home/ui/Background';
import Panel from '@/src/features/home/ui/Panel';
import ChapterList from '@/src/features/chapter-list/ui/ChapterList';

export default function Chapters() {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#010407]">
      <Background></Background>
      <Panel />
      <ChapterList></ChapterList>
    </main>
  );
}
