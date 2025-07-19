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

        const activeWorkspaceInfo = currentUserSession.ActiveWorkspaceInfo;
        console.log("activeWorkspaceInfo >>", activeWorkspaceInfo);
        if (activeWorkspaceInfo !== undefined) {
            setActiveWorkspace(activeWorkspaceInfo);

            if (activeWorkspaceInfo.Storage === "locale") {
                const getLocaleCollectionListResult = await window.electronAPI.HttpCollectionService.GetLocaleCollectionList(activeWorkspaceInfo.code);
                const activeCollectionList = getLocaleCollectionListResult.success ? getLocaleCollectionListResult.CollectionList : [];
                setCollectionList(activeCollectionList);
                console.log(activeCollectionList);
            }
        }
    }

    useEffect(() => {
        initialize();
    }, [])

    return (<Layout />);
}
