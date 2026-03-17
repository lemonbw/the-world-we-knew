'use client';

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onClick?: () => void;
  className?: string;
  placeholder?: string;
}

export default function SearchInput({
  query,
  setQuery,
  onClick,
  className,
  placeholder,
}: SearchInputProps) {
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
