
import { create } from 'zustand';

interface State {
    initialized: boolean;
}

export const useHealthLogStore = create<State>(() => ({
    initialized: false,
}));

