'use client';

import { useEffect, useRef, useState } from 'react';
import { useChapterListState } from './useChapterListState';

type PaginationAction = 'start' | 'prev' | 'next' | 'end' | number;
type ListDirection = 'toRight' | 'toLeft' | 'toDown' | 'toUp';

export const useChapterListController = () => {
  const { isAsc, setIsAsc, page, setPage, pages, ...state } =
    useChapterListState();

  const [direction, setDirection] = useState<ListDirection>('toRight');
  const [listPhase, setListPhase] = useState(0);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const activateTransition = (
    nextDirection: ListDirection,
    action: () => void,
  ) => {
    setDirection(nextDirection);
    setListPhase(1);

    timeoutsRef.current.forEach(clearTimeout);

    timeoutsRef.current = [
      setTimeout(action, 300),
      setTimeout(() => setListPhase(2), 300),
      setTimeout(() => setListPhase(0), 500),
    ];
  };

  const handleSortChange = () => {
    activateTransition(isAsc === 'asc' ? 'toUp' : 'toDown', () =>
      setIsAsc((prev) => (prev === 'asc' ? 'desc' : 'asc')),
    );
  };

  const handlePaginationAction = (action: PaginationAction) => {
    if (action === 'start') {
      activateTransition('toRight', () => setPage(0));
      return;
    }

    if (action === 'prev') {
      activateTransition('toRight', () => {
        setPage((current) => Math.max(current - 1, 0));
      });
      return;
    }

    if (action === 'next') {
      activateTransition('toLeft', () => {
        setPage((current) => Math.min(current + 1, pages.length - 1));
      });
      return;
    }

    if (action === 'end') {
      activateTransition('toLeft', () => {
        setPage(pages.length - 1);
      });
      return;
    }

    activateTransition(action > page ? 'toLeft' : 'toRight', () =>
      setPage(action),
    );
  };

  return {
    ...state,
    isAsc,
    setIsAsc,
    page,
    setPage,
    pages,
    direction,
    listPhase,
    handleSortChange,
    handlePaginationAction,
  };
};
