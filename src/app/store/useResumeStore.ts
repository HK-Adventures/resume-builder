import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData } from '../types/resume';

interface ResumeStore {
  data: ResumeData;
  activeStep: number;
  setActiveStep: (step: number) => void;
  setData: (data: Partial<ResumeData>) => void;
  loadResumeByUsername: (username: string) => Promise<void>;
}

const initialData: ResumeData = {
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
      data: initialData,
      activeStep: 0,
      setActiveStep: (step) => set({ activeStep: step }),
      setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
      loadResumeByUsername: async (username) => {
        try {
          // For now, we'll just load from localStorage
          // In a real app, this would be an API call
          const savedData = localStorage.getItem(`resume_${username}`);
          if (savedData) {
            set({ data: JSON.parse(savedData) });
          }
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      },
    }),
    {
      name: 'resume-storage',
      skipHydration: true,
    }
  )
); 