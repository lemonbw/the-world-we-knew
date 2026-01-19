export default function ChapterListToggle() {
  return (
    <nav className="flex justify-center gap-4 text-[1.2rem]">
      <button>⮜</button>
      {Array.from({ length: 8 }, (_, i) => (
        <button
          key={i}
          className="border-1 rounded-md my-2 py-0 px-[4px]"
        >
          {i + 1}
        </button>
      ))}
      <button>⮞</button>
    </nav>
  );
}

