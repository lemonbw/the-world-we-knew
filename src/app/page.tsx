import Main from '@/src/shared/ui/Main';
import BookCard from '@/src/features/home/ui/BookCard';
import Panel from '@/src/features/home/ui/Panel';
import Overview from '@/src/features/home/ui/Overview';

export default function Home() {
  return (
    <Main>
      <BookCard></BookCard>
      <Panel />
      <Overview></Overview>
    </Main>
  );
}
