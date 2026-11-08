'use client';

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onClick?: () => void;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
}

export const SearchInput = ({
  query,
  setQuery,
  onClick,
  className,
  containerClassName,
  placeholder,
}: SearchInputProps) => {
  return (
    <div
      className={
        containerClassName ||
        'mx-auto flex h-full w-50 flex-col items-center gap-2 lg:w-full'
      }
    >
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
};
