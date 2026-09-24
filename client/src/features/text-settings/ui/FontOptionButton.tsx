'use client';

import { useCompleteHoverAnimation } from '@/src/shared/hooks/useCompleteHoverAnimation';

type FontOptionButtonProps = {
  font: string;
  isCurrent?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

export const FontOptionButton = ({
  font,
  isCurrent,
  onClick,
  children,
}: FontOptionButtonProps) => {
  const {
    isFilled,
    isTextActive,
    animationRef,
    onMouseEnter,
    onMouseLeave,
    onTransitionEnd,
  } = useCompleteHoverAnimation();

  const textColor = isTextActive
    ? 'text-white dark:text-black'
    : 'text-black dark:text-white';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative isolate h-[34px] flex-none border-b-2 px-2 py-1 text-left ${textColor} transition-colors duration-150 ${
        isCurrent ? 'font-bold' : ''
      }`}
    >
      <span
        ref={animationRef}
        onTransitionEnd={onTransitionEnd}
        className={`pointer-events-none absolute bottom-0 left-0 -z-10 h-full w-full origin-left bg-black transition-transform duration-300 ease-out dark:bg-white ${
          isFilled ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
      {children ?? font}
    </button>
  );
};
