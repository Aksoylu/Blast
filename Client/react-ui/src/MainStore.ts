import { create } from "zustand";
import { AppPrefences, UserSession, Workspace } from "./Models";

interface MainStore {
    blastPath?: string;
    setBlastPath: (path?: string) => void;

    userSession?: UserSession;
    setUserSession: (session?: UserSession) => void;

    appPrefences?: AppPrefences;
    setAppPrefences: (appPrefences?: AppPrefences) => void;

    localeWorkSpaceList:  Workspace[];
    setLocaleWorkSpaceList: (workspaceList?: Workspace[]) => void;
}


export const useMainStore = create<MainStore>((set) => ({
    blastPath: undefined,
    setBlastPath: (path) => set({ blastPath: path }),

    userSession: undefined,
    setUserSession: (session) => set({ userSession: session }),

    appPrefences: undefined,
    setAppPrefences: (appPrefences) => set({ appPrefences: appPrefences }),

    localeWorkSpaceList: [] as Workspace[],
    setLocaleWorkSpaceList: (workspaceList) => set({ localeWorkSpaceList: workspaceList })
}));
