import Header from "./Header"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#010407]">
      <Header></Header>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white dark:bg-[#010407] sm:items-start">
        {children}
      </main>
    </div>
  );
}
