import { create } from 'zustand';

interface AmbienceState {
    isMuted: boolean;
    toggleMute: () => void;
    setMute: (muted: boolean) => void;
}

export const useAmbienceStore = create<AmbienceState>((set) => ({
    isMuted: true, // Default to muted for auto-playing background videos
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    setMute: (muted) => set({ isMuted: muted }),
}));
