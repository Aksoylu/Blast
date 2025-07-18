import { JSX, useEffect } from "react";
import { useMainStore } from "./MainStore";
import Layout from "./Pages/Layout";

export const App = (): JSX.Element => {
    const setBlastPath = useMainStore((state) => state.setBlastPath);
    const setUserSession = useMainStore((state) => state.setUserSession);
    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList);
    const setActiveWorkspace = useMainStore((state) => state.setActiveWorkspace);
    const setCollectionList = useMainStore((state) => state.setCollectionList);

    const initialize = async () => {
        const detectedBlastPath = await window.electronAPI.FileSystemService.GetBlastPath();
        setBlastPath(detectedBlastPath);

        const readSessionInfoFromStorageResult = await window.electronAPI.UserSessionService.ReadSessionInfoFromStorage();

        if (!readSessionInfoFromStorageResult.success) {
            // todo: show logout modal
            return;
        }

        const currentUserSession = readSessionInfoFromStorageResult.userSession;
        setUserSession(currentUserSession);

        const localeWorkspaceList = await window.electronAPI.WorkspaceService.GetLocaleWorkspaceList();
        if (localeWorkspaceList.success) {
            setLocaleWorkSpaceList(localeWorkspaceList.workspaceList);
        }

        const workspaceInfo = currentUserSession.ActiveWorkspaceInfo;
        if (workspaceInfo !== undefined) {
            setActiveWorkspace(workspaceInfo);
            const collectionList = await window.electronAPI.CollectionService.GetAllCollectionsInWorkspace(workspaceInfo);
            
        }
    }

    useEffect(() => {
        initialize();
    }, [])

    return (<Layout />);
}
