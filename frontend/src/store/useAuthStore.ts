
import { create } from 'zustand';

interface State {
    initialized: boolean;
}

export const useAuthStore = create<State>(() => ({
    initialized: false,
}));

