import { chapters } from '@/src/entities/chapter/model/chapters';

export const chapterSort = (order: 'asc' | 'desc') => {
  return [...chapters].sort((a, b) =>
    order === 'asc' ? a.index - b.index : b.index - a.index,
  );
};
