import { create } from "zustand";
import { AppPrefences, HttpRequestCollection, UserSession, Workspace } from "./Models";

interface MainStore {
    blastPath?: string;
    setBlastPath: (path?: string) => void;

    userSession?: UserSession;
    setUserSession: (session?: UserSession) => void;

    activeWorkspace?: Workspace;
    setActiveWorkspace: (workspace: Workspace) => void;

    appPrefences?: AppPrefences;
    setAppPrefences: (appPrefences?: AppPrefences) => void;

    localeWorkSpaceList: Workspace[];
    setLocaleWorkSpaceList: (workspaceList?: Workspace[]) => void;

    collectionList: HttpRequestCollection[];
    setCollectionList: (collectionList: HttpRequestCollection[]) => void;
}


export const useMainStore = create<MainStore>((set, get) => ({
    blastPath: undefined,
    setBlastPath: (path) => set({ blastPath: path }),

    userSession: undefined,
    setUserSession: (session) => set({ userSession: session }),

    appPrefences: undefined,
    setAppPrefences: (appPrefences) => set({ appPrefences: appPrefences }),

    localeWorkSpaceList: [] as Workspace[],
    setLocaleWorkSpaceList: (workspaceList) => set({ localeWorkSpaceList: workspaceList }),

    activeWorkspace: undefined,
    setActiveWorkspace: (workspace: Workspace) => {
        const currentSession = get().userSession;
        if (!currentSession) return;

        set({ activeWorkspace: workspace });
        const updatedSession = { ...currentSession, ActiveWorkspace: workspace };
        console.log(updatedSession);
        set({ userSession: updatedSession });
    },

    collectionList: [] as HttpRequestCollection[],
    setCollectionList: (collections) => set({ collectionList: collections }),
}));
