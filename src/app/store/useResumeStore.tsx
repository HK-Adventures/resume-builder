'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ResumeData } from '../types/resume';

interface ResumeStore {
  data: Partial<ResumeData>;
  activeStep: number;
  setData: (data: Partial<ResumeData>) => void;
  setActiveStep: (step: number) => void;
  reset: () => void;
}

const initialState: Partial<ResumeData> = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  certificates: [],
  languages: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialState,
      activeStep: 0,
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      setActiveStep: (step) => set({ activeStep: step }),
      reset: () => set({ data: initialState, activeStep: 0 }),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);