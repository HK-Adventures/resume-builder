'use client';

import './globals.css';
import { useEffect } from 'react';
import { useResumeStore } from './store/useResumeStore';

function StoreInitializer() {
  useEffect(() => {
    useResumeStore.persist.rehydrate();
  }, []);
  
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreInitializer />
        {children}
      </body>
    </html>
  );
}
