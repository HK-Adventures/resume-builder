'use client';

import { useEffect } from 'react';
import { useResumeStore } from '../store/useResumeStore';

export function StoreInitializer() {
  useEffect(() => {
    // Initialize the store on the client side
    useResumeStore.persist.rehydrate();
  }, []);
  
  return null;
} 