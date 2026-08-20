import { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { useMedia } from 'use-media';
import { chunkArray } from '@/src/shared/lib//arrays/chunkArray';
import { chapterSort } from '@/src/entities/chapter';

export const useChapterListState = () => {
  const [pageSize, setPageSize] = useState(20);

  const [panelSize, setPanelSize] = useState(8);

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) {
      setPanelSize(4);
      setPageSize(15);
    } else {
      setPanelSize(8);
      setPageSize(20);
    }
  }, [isLarge, setPanelSize, setPageSize]);

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const [isAsc, setIsAsc] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const sortedChapters = useMemo(() => chapterSort(isAsc), [isAsc]);

  const filteredChapters = useMemo(() => {
    if (!deferredQuery) return sortedChapters;
    const q = deferredQuery.toLowerCase();
    return sortedChapters.filter((ch) => ch.searchIndex?.includes(q));
  }, [deferredQuery, sortedChapters]);

  const listSource = query ? filteredChapters : sortedChapters;

  const pages = useMemo(
    () => chunkArray(listSource, pageSize),
    [listSource, pageSize],
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
};
