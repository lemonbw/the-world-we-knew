'use client';

import { useEffect, useRef } from 'react';

const DEFAULT_INTERVAL_MS = 300_000; // 5 minutes

export const usePeriodicVideo = (intervalMs = DEFAULT_INTERVAL_MS) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.currentTime = 0;
      void video.play();
    };

    const interval = setInterval(play, intervalMs);
    play();

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { videoRef };
};
