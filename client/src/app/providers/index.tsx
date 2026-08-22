'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
