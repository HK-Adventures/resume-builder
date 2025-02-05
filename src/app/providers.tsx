'use client';

import { StoreInitializer } from './components/StoreInitializer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreInitializer />
      {children}
    </>
  );
} 