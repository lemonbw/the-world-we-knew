type GetChapterTableLinkClassesParams = {
  listPhase: number;
  direction: 'toRight' | 'toLeft' | 'toDown' | 'toUp';
};

export const getChapterTableLinkClasses = ({
  listPhase,
  direction,
}: GetChapterTableLinkClassesParams) => {
  const base =
    'block w-full h-full z-10 transition-colors duration-500 text-black group-hover:text-white dark:text-white dark:group-hover:text-black outline-white group-hover:outline-black dark:outline-black dark:group-hover:outline-white';

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

  return `${base} ${opacity} ${transMap[direction]}`;
};
