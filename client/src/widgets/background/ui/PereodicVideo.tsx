'use client';

import { usePeriodicVideo } from '../model';

export const PereodicVideo = () => {
  const { videoRef } = usePeriodicVideo();

  return (
    <video
      ref={videoRef}
      src="/videos/rabbit.webm"
      muted
      playsInline
      className="pointer-events-none fixed top-1/3 -right-30 z-[60] size-350 -translate-y-1/3"
    />
  );
};
