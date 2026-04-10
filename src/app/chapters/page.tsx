import Main from '@/src/shared/ui/Main';
import Background from '@/src/features/home/ui/Background';
import Panel from '@/src/features/home/ui/Panel';
import ChapterList from '@/src/features/chapter-list/ui/ChapterList';

export default function Chapters() {
  return (
    <Main>
      <Background></Background>
      <Panel />
      <ChapterList></ChapterList>
    </Main>
  );
}
