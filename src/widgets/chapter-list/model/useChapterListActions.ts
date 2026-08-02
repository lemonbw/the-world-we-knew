import { useState } from "react";

type UseChapterListActionsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages: unknown[];
  isAsc: 'asc' | 'desc';
  setIsAsc: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
};

export function useChapterListActions({
  page,
  setPage,
  pages,
  isAsc,
  setIsAsc,
}: UseChapterListActionsProps) {
  const [direction, setDirection] = useState<
    'toRight' | 'toLeft' | 'toDown' | 'toUp'
  >('toRight');

  const [listPhase, setListPhase] = useState(0);
  const [isSortButtonPressed, setSortButtonPressed] = useState(false);
  const [triggerAnimationIndex, setTriggerAnimationIndex] = useState(0);

  const activateButton = (action: () => void) => {
    setListPhase(1);
    setTimeout(action, 300);
    setTimeout(() => setListPhase(2), 300);
    setTimeout(() => setListPhase(0), 500);
  };

  const trigger = (index: number) => {
    setTriggerAnimationIndex(index);
    setTimeout(() => setTriggerAnimationIndex(0), 200);
  };

  const activateSortButton = () => {
    setDirection(isAsc === 'asc' ? 'toUp' : 'toDown');
    activateButton(() =>
      setIsAsc((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    );
    setSortButtonPressed(true);
    setTimeout(() => setSortButtonPressed(false), 150);
  };

  const activateStartButton = () => {
    setDirection('toRight');
    activateButton(() => setPage(0));
    trigger(1);
  };

  const activatePrevButton = () => {
    setDirection('toRight');
    activateButton(() => setPage((prev) => Math.max(prev - 1, 0)));
    trigger(2);
  };

  const activateNextButton = () => {
    setDirection('toLeft');
    activateButton(() =>
      setPage((prev) => Math.min(prev + 1, pages.length - 1))
    );
    trigger(3);
  };

  const activateEndButton = () => {
    setDirection('toLeft');
    activateButton(() => setPage(pages.length - 1));
    trigger(4);
  };

  const goToPage = (pageIndex: number) => {
    setDirection(pageIndex > page ? 'toLeft' : 'toRight');
    activateButton(() => setPage(pageIndex));
  };

  return {
    direction,
    listPhase,
    isSortButtonPressed,
    triggerAnimationIndex,

    activateSortButton,
    activateStartButton,
    activatePrevButton,
    activateNextButton,
    activateEndButton,
    goToPage,
  };
}
