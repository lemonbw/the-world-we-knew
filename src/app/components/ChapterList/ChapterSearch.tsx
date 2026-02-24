"use client";

interface ChapterSearchProps {
  query: string;
  setQuery: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function ChapterSearch({ query, setQuery, className, placeholder }: ChapterSearchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={className}
      />
    </div>
  );
}

