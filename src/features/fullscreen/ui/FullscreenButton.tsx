'use client';

import { RefObject } from 'react';
import { useFullscreen } from '../model/useFullscreen';

type FullscreenButtonProps = {
  element: RefObject<HTMLElement | null>;
};

export function FullscreenButton({ element }: FullscreenButtonProps) {
  const { fullscreen, toggleFullscreen } = useFullscreen({
    element,
  });

  return (
    <button
      className="material-icons mt-2 ml-7 w-10 text-[2.5rem]! transition-all duration-300 hover:text-[2.7rem]!"
      onClick={toggleFullscreen}
    >
      {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
    </button>
  );
}
