
import { create } from 'zustand';

interface State {
    initialized: boolean;
}

export const useChatStore = create<State>(() => ({
    initialized: false,
}));

