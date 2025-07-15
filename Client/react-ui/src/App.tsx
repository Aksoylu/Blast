import { JSX, useEffect } from "react";
import { useMainStore } from "./MainStore";
import Layout from "./Pages/Layout";

export const App = (): JSX.Element => {
    const setBlastPath = useMainStore((state) => state.setBlastPath);
    const setUserSession = useMainStore((state) => state.setUserSession);
    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList)

    const initialize = async () => {
        const detectedBlastPath = await window.electronAPI.FileSystemService.GetBlastPath()
        setBlastPath(detectedBlastPath);

        const readSessionInfoFromStorageResult = await window.electronAPI.UserSessionService.ReadSessionInfoFromStorage();
        if (readSessionInfoFromStorageResult.success) {
            setUserSession(readSessionInfoFromStorageResult.userSession)
        }
        else {
            // todo: show logout modal
        }

        const localeWorkspaceList = await window.electronAPI.WorkspaceService.GetLocaleWorkspaceList();
        if (localeWorkspaceList.success) {
            setLocaleWorkSpaceList(localeWorkspaceList.workspaceList);
        }
    }

    useEffect(() => {
        initialize();
    })

    return (<Layout />);
}
