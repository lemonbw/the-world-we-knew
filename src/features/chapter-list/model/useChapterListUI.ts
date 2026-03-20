import { useState, useRef } from "react";

type UseChapterListUIProps = {
  direction: 'toRight' | 'toLeft' | 'toDown' | 'toUp';
  listPhase: number;
};

export function useChapterListUI({ direction, listPhase }: UseChapterListUIProps) {
  const NO_HOVER = -2;

  const [hoveredIndex, setHovered] = useState(NO_HOVER);
  const [hoveredButton, setHoveredButton] = useState(-1);

  const rowHoverDelayRef = useRef<NodeJS.Timeout | null>(null);
  const buttonHoverDelayRef = useRef<NodeJS.Timeout | null>(null);

  const className = 'mt-3 mb-2 text-[0.7rem] lg:text-[1.1rem] text-center w-30 lg:w-80 border rounded h-5 lg:h-8';
  const placeholder = 'Chapter, title, date';

  const handleRowEnter = (index: number) => () => {
    rowHoverDelayRef.current = setTimeout(() => {
      setHovered(index);
    }, 150);
  };

  const handleRowLeave = () => {
    if (rowHoverDelayRef.current) {
      clearTimeout(rowHoverDelayRef.current);
      rowHoverDelayRef.current = null;
    }
    setHovered(NO_HOVER);
  };

  const handleButtonEnter = (index: number) => () => {
    buttonHoverDelayRef.current = setTimeout(() => {
      setHoveredButton(index);
    }, 150);
  };

  const handleButtonLeave = () => {
    if (buttonHoverDelayRef.current) {
      clearTimeout(buttonHoverDelayRef.current);
      buttonHoverDelayRef.current = null;
    }
    setHoveredButton(-1);
  };

  const getLinkClasses = (index: number) => {
    const base = 'block w-full h-full z-10 transition-all duration-500';

    const color =
      hoveredIndex === index
        ? 'text-black duration-1000 outline-black'
        : 'text-white outline-white';

    const opacity = listPhase === 0 ? 'opacity-100' : 'opacity-0';

    const translateRight =
      listPhase === 1
        ? 'translate-x-[30px]'
        : listPhase === 2
          ? 'translate-x-[-30px]'
          : 'translate-0';

    const translateLeft =
      listPhase === 1
        ? 'translate-x-[-30px]'
        : listPhase === 2
          ? 'translate-x-[30px]'
          : 'translate-0';

    const translateDown =
      listPhase === 1
        ? 'translate-y-[10px]'
        : listPhase === 2
          ? 'translate-y-[-10px]'
          : 'translate-0';

    const translateUp =
      listPhase === 1
        ? 'translate-y-[-10px]'
        : listPhase === 2
          ? 'translate-y-[10px]'
          : 'translate-0';

    const translate =
      direction === 'toLeft'
        ? translateLeft
        : direction === 'toRight'
          ? translateRight
          : direction === 'toUp'
            ? translateUp
            : translateDown;

    return `${base} ${color} ${opacity} ${translate}`;
  };

  return {
    className,
    placeholder,

    hoveredIndex,
    hoveredButton,

    handleRowEnter,
    handleRowLeave,

    handleButtonEnter,
    handleButtonLeave,

    getLinkClasses,
    NO_HOVER,
  };
}
