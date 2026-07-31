import Background from '@/src/features/home/ui/Background';
import Panel from '@/src/features/home/ui/Panel';
import Overview from '@/src/features/home/ui/Overview';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#010407]">
      <Background></Background>
      <Panel />
      <Overview></Overview>
    </main>
  );
}
