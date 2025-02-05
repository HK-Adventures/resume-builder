'use client';

import { useEffect } from 'react';
import { useResumeStore } from '../store/useResumeStore';

export function StoreInitializer() {
  useEffect(() => {
    useResumeStore.persist.rehydrate();
  }, []);
  
  return null;
} 