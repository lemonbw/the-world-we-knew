'use client';

import { useEffect, useRef } from 'react';

export const PereodicVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      video.currentTime = 0;
      void video.play();
    };
    const interval = setInterval(play, 300000);
    play();
    return () => clearInterval(interval);
  }, []);

  return (
    <video
      ref={videoRef}
      src="/videos/rabbit.webm"
      muted
      playsInline
      className="pointer-events-none fixed top-1/3 -right-30 z-0 size-350 -translate-y-1/3"
    />
  );
};
