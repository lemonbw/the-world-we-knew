import { useState, useMemo, useEffect, useDeferredValue } from "react";
import { useMedia } from "use-media";
import chunkChapters from '@/src/features/chapter-list/lib/chunkChapters';
import ChapterSort from '@/src/features/chapter-list/lib/ChapterSort';

export function useChapterListState() {
  const pageSize = 20;

  const [panelSize, setPanelSize] = useState(8);

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) setPanelSize(5);
    else setPanelSize(8);
  }, [isLarge, setPanelSize]);

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const [isAsc, setIsAsc] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const sortedChapters = useMemo(() => ChapterSort(isAsc), [isAsc]);

  const filteredChapters = useMemo(() => {
    if (!deferredQuery) return sortedChapters;
    const q = deferredQuery.toLowerCase();
    return sortedChapters.filter((ch) => ch.searchIndex?.includes(q));
  }, [deferredQuery, sortedChapters]);

  const listSource = query ? filteredChapters : sortedChapters;

  const pages = useMemo(
    () => chunkChapters(listSource, pageSize),
    [listSource]
  );

  const currentPage = pages[page] ?? [];

  const startPage =
    page < Math.floor(panelSize / 2)
      ? 0
      : page > pages.length - Math.ceil(panelSize / 2)
        ? pages.length - panelSize
        : page - Math.floor(panelSize / 2);

  return {
    query,
    setQuery,

    isAsc,
    setIsAsc,

    page,
    setPage,

    pages,
    currentPage,
    startPage,

    panelSize,
    pageSize,
  };
}
