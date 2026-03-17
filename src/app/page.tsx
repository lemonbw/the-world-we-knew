import Main from '@/src/shared/ui/Main';
import BookCard from '@/src/features/home/book-card/BookCard';
import Panel from '@/src/components/home/Panel';
import Overview from '@/src/components/home/Overview';

export default function Home() {
  return (
    <Main>
      <BookCard></BookCard>
      <Panel />
      <Overview></Overview>
    </Main>
  );
}
