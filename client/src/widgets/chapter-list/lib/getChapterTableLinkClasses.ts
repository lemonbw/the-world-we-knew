type GetChapterTableLinkClassesParams = {
  index: number;
  hoveredIndex: number;
  listPhase: number;
  direction: 'toRight' | 'toLeft' | 'toDown' | 'toUp';
};

export const getChapterTableLinkClasses = ({
  index,
  hoveredIndex,
  listPhase,
  direction,
}: GetChapterTableLinkClassesParams) => {
  const base = 'block w-full h-full z-10 transition-color duration-500';

  const color =
    hoveredIndex === index
      ? 'text-white dark:text-black duration-1000 outline-black'
      : 'text-black dark:text-white outline-white';

  const opacity = listPhase === 0 ? 'opacity-100' : 'opacity-0';

  const transMap = {
    toRight:
      listPhase === 1
        ? 'translate-x-[30px]'
        : listPhase === 2
          ? '-translate-x-[30px]'
          : 'translate-x-0',
    toLeft:
      listPhase === 1
        ? '-translate-x-[30px]'
        : listPhase === 2
          ? 'translate-x-[30px]'
          : 'translate-x-0',
    toDown:
      listPhase === 1
        ? 'translate-y-[10px]'
        : listPhase === 2
          ? '-translate-y-[10px]'
          : 'translate-y-0',
    toUp:
      listPhase === 1
        ? '-translate-y-[10px]'
        : listPhase === 2
          ? 'translate-y-[10px]'
          : 'translate-y-0',
  };

  return `${base} ${color} ${opacity} ${transMap[direction]}`;
};
