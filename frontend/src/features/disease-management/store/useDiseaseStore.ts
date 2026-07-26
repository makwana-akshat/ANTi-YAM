import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HealthLog {
  id: string;
  diseaseId: string;
  timestamp: string;
  data: Record<string, any>;
}

interface DiseaseStore {
  primaryDisease: string | null;
  setPrimaryDisease: (diseaseId: string | null) => void;
  
  clerkUserId: string | null;
  setClerkUserId: (id: string) => void;
  clearStore: () => void;
  
  isLoggingModalOpen: boolean;
  currentLoggingContext: string | null;
  openModal: (diseaseId: string) => void;
  closeModal: () => void;

  activeLogs: HealthLog[];
  saveLog: (diseaseId: string, data: Record<string, any>) => void;
  streak: number;
}

export const useDiseaseStore = create<DiseaseStore>()(
  persist(
    (set) => ({
      primaryDisease: null,
      setPrimaryDisease: (diseaseId) => set({ primaryDisease: diseaseId }),

      clerkUserId: null,
      setClerkUserId: (id) => set({ clerkUserId: id }),
      clearStore: () => set({ 
        primaryDisease: null, 
        activeLogs: [], 
        currentLoggingContext: null,
        isLoggingModalOpen: false,
        streak: 0 
      }),
      
      isLoggingModalOpen: false,
      currentLoggingContext: null,
      openModal: (diseaseId) => set({ isLoggingModalOpen: true, currentLoggingContext: diseaseId }),
      closeModal: () => set({ isLoggingModalOpen: false, currentLoggingContext: null }),

      activeLogs: [],
      saveLog: (diseaseId, data) => set((state) => {
        const newLog: HealthLog = {
          id: Date.now().toString(),
          diseaseId,
          timestamp: new Date().toISOString(),
          data
        };
        // Very basic streak logic: if active logs length increases, assume +1
        return {
          activeLogs: [newLog, ...state.activeLogs],
          streak: state.streak + 1,
          isLoggingModalOpen: false, // auto close
        };
      }),
      streak: 12, // mock streak
    }),
    {
      name: 'disease-storage',
    }
  )
);
