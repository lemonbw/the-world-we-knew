"use client";

interface ChapterSearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export function ChapterSearch({ query, setQuery }: ChapterSearchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="search"
        placeholder="Chapter, title, date"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-3 mb-2 text-center w-80 border rounded h-8"
      />
    </div>
  );
}

