'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export const useCompleteHoverAnimation = () => {
  const [phase, setPhase] = useState<'idle' | 'filling' | 'full' | 'reversing'>(
    'idle',
  );
  const [isTextActive, setIsTextActive] = useState(false);
  const isHoveredRef = useRef(false);
  const fillStartedAtRef = useRef(0);
  const finishFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<HTMLSpanElement>(null);

  const clearFinishFallback = useCallback(() => {
    if (finishFallbackRef.current !== null) {
      clearTimeout(finishFallbackRef.current);
      finishFallbackRef.current = null;
    }
  }, []);

  const clearTextReset = useCallback(() => {
    if (textResetRef.current !== null) {
      clearTimeout(textResetRef.current);
      textResetRef.current = null;
    }
  }, []);

  const getTransitionDuration = useCallback(() => {
    const duration = getComputedStyle(animationRef.current!).transitionDuration;

    return Math.max(
      ...duration.split(',').map((value) => {
        const numericValue = Number.parseFloat(value);
        return value.trim().endsWith('ms') ? numericValue : numericValue * 1000;
      }),
    );
  }, []);

  const startReverseFallback = useCallback(() => {
    clearFinishFallback();

    const elapsed = performance.now() - fillStartedAtRef.current;
    const remaining = Math.max(getTransitionDuration() - elapsed, 0);

    finishFallbackRef.current = setTimeout(() => {
      finishFallbackRef.current = null;
      if (!isHoveredRef.current) {
        setPhase((currentPhase) =>
          currentPhase === 'filling' ? 'reversing' : currentPhase,
        );
      }
    }, remaining);
  }, [clearFinishFallback, getTransitionDuration]);

  useEffect(() => clearFinishFallback, [clearFinishFallback]);
  useEffect(() => clearTextReset, [clearTextReset]);

  useEffect(() => {
    if (phase !== 'reversing') return;

    clearFinishFallback();
    clearTextReset();
    const duration = getTransitionDuration();

    textResetRef.current = setTimeout(() => {
      textResetRef.current = null;
      if (!isHoveredRef.current) setIsTextActive(false);
    }, duration / 2);

    finishFallbackRef.current = setTimeout(() => {
      finishFallbackRef.current = null;
      if (!isHoveredRef.current) setPhase('idle');
    }, duration);

    return () => {
      clearFinishFallback();
      clearTextReset();
    };
  }, [clearFinishFallback, clearTextReset, getTransitionDuration, phase]);

  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    clearFinishFallback();
    clearTextReset();
    setIsTextActive(true);
    setPhase((currentPhase) => {
      if (currentPhase === 'idle' || currentPhase === 'reversing') {
        fillStartedAtRef.current = performance.now();
        return 'filling';
      }

      return currentPhase;
    });
  }, [clearFinishFallback, clearTextReset]);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setPhase((currentPhase) => {
      if (currentPhase === 'full') return 'reversing';

      if (currentPhase === 'filling') startReverseFallback();

      return currentPhase;
    });
  }, [startReverseFallback]);

  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform')
        return;

      clearFinishFallback();
      setPhase((currentPhase) => {
        if (currentPhase === 'filling') {
          return isHoveredRef.current ? 'full' : 'reversing';
        }

        if (currentPhase === 'reversing') {
          return isHoveredRef.current ? 'filling' : 'idle';
        }

        return currentPhase;
      });
    },
    [clearFinishFallback],
  );

  const isFilled = phase === 'filling' || phase === 'full';
  return {
    isFilled,
    isTextActive,
    animationRef,
    onMouseEnter,
    onMouseLeave,
    onTransitionEnd,
  };
};
