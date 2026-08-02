import { useCallback, useEffect, useState, RefObject } from 'react';

type UseFullscreenProps = {
  element: RefObject<HTMLElement | null>;
};

export function useFullscreen({ element }: UseFullscreenProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      element.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [element]);

  useEffect(() => {
    const handler = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (
        e.key.toLowerCase() === 'f' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [toggleFullscreen]);

  return {
    fullscreen,
    toggleFullscreen,
  };
}
