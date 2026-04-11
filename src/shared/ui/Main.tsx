import Header from '@/src/shared/ui/Header';
import Footer from '@/src/shared/ui/Footer';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] w-full bg-zinc-50 font-sans dark:bg-[#010407]">
      <Header />
      <main className="flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#010407]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
