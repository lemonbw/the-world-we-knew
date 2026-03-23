import Main from '@/src/shared/ui/Main';
import BookCard from '@/src/features/home/ui/BookCard';
import Panel from '@/src/features/home/ui/Panel';
import ChapterList from '@/src/features/chapter-list/ui/ChapterList';

export default function Chapters() {
  return (
    <Main>
      <BookCard></BookCard>
      <Panel />
      <ChapterList></ChapterList>
    </Main>
  );
}
