import Main from '@/src/shared/ui/Main';
import BookCard from '@/src/features/home/book-card/BookCard';
import Panel from '@/src/components/home/Panel';
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
