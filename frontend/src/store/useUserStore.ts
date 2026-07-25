
import { create } from 'zustand';

interface State {
    initialized: boolean;
}

export const useUserStore = create<State>(() => ({
    initialized: false,
}));

