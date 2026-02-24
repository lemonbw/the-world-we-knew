"use client";

interface ChapterSearchProps {
  query: string;
  setQuery: (value: string) => void;
  onClick: () => void;
  className?: string;
  placeholder?: string;
}

export default function ChapterSearch({ query, setQuery, onClick, className, placeholder }: ChapterSearchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onClick={() => onClick?.()}
        onChange={(e) => setQuery(e.target.value)}
        className={className}
      />
    </div>
  );
}

