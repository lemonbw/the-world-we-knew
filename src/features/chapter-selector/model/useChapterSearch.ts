import { useState, useMemo } from 'react';
import { useDeferredValue } from 'react';
import { useParams } from 'next/navigation';
import { chapters } from '@/src/entities/chapter/model/chapters';

export function useChapterSearch() {
  const params = useParams();
  const slug = params?.slug;

  const [query, setQuery] = useState('');

  const deferredQuery = useDeferredValue(query);

  const filteredChapters = useMemo(() => {
    if (!deferredQuery) return chapters;
    const q = deferredQuery.toLowerCase();
    return chapters.filter((ch) => ch.searchIndex?.includes(q));
  }, [deferredQuery]);

  const isSearching = query.length > 0;
  const listSource = isSearching ? filteredChapters : chapters;

  const currentChapter = useMemo(
    () => chapters.find((ch) => ch.slug === slug),
    [slug],
  );

  return {
    query,
    setQuery,
    listSource,
    isSearching,
    currentChapter,
  };
}
