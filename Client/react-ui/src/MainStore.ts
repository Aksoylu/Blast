import { create } from "zustand";
import { AppPrefences, UserSession } from "./Models";

interface MainStore {
    blastPath?: string;
    setBlastPath: (path?: string) => void;

    userSession?: UserSession;
    setUserSession: (session?: UserSession) => void;

    appPrefences?: AppPrefences;
    setAppPrefences: (appPrefences?: AppPrefences) => void;
}


export const useMainStore = create<MainStore>((set) => ({
    blastPath: undefined,
    setBlastPath: (path) => set({ blastPath: path }),

    userSession: undefined,
    setUserSession: (session) => set({ userSession: session }),

    appPrefences: undefined,
    setAppPrefences: (appPrefences) => set({ appPrefences: appPrefences }),
}));
