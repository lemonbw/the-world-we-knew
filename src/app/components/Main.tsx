import Header from "./Header"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-dvh bg-zinc-50 font-sans dark:bg-[#010407]">
      <Header></Header>
      <main className="bg-white dark:bg-[#010407]">
        {children}
      </main>
    </div>
  );
}
