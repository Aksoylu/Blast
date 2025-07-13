import { create } from "zustand";
import { UserSession } from "./Models";

interface MainStore {
    blastPath?: string;
    setBlastPath: (path?: string) => void;

    userSession?: UserSession;
    setUserSession: (session?: UserSession) => void;
}


export const useMainStore = create<MainStore>((set) => ({
    blastPath: undefined,
    setBlastPath: (path) => set({ blastPath: path }),

    userSession: undefined,
    setUserSession: (session) =>  set({ userSession: session })
}));
