import Main from '@/src/shared/ui/Main';
import Background from '@/src/features/home/ui/Background';
import Panel from '@/src/features/home/ui/Panel';
import Overview from '@/src/features/home/ui/Overview';

export default function Home() {
  return (
    <Main>
      <Background></Background>
      <Panel />
      <Overview></Overview>
    </Main>
  );
}
