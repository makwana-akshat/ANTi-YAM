
import { create } from 'zustand';

interface State {
    initialized: boolean;
}

export const useThemeStore = create<State>(() => ({
    initialized: false,
}));

