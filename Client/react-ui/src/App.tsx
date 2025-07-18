import { JSX, useEffect, useState } from "react";
import { useMainStore } from "./MainStore";
import Layout from "./Pages/Layout";
import { Workspace } from "./Models";

export const App = (): JSX.Element => {
    let isInitialized = false;

    const setBlastPath = useMainStore((state) => state.setBlastPath);
    const setUserSession = useMainStore((state) => state.setUserSession);
    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList);
    const setActiveWorkspace = useMainStore((state) => state.setActiveWorkspace);

    /*
    const loadWorkspace = async (workspaceInfo: Workspace) => {
        switch (workspaceInfo.Storage) {
            case "locale":
                return await window.electronAPI.WorkspaceService.LoadWorkspaceInfo(workspaceKey);
            
            case "remote":
                return await window.electronAPI.RemoteWorkspaceService.LoadWorkspaceInfo(workspacekey);
        }
   
    }
    */

    const initialize = async () => {
        const detectedBlastPath = await window.electronAPI.FileSystemService.GetBlastPath();
        console.log("detectedBlastPath  >> ", detectedBlastPath);

        setBlastPath(detectedBlastPath);

        const readSessionInfoFromStorageResult = await window.electronAPI.UserSessionService.ReadSessionInfoFromStorage();
        console.log("readSessionInfoFromStorageResult  >> ", readSessionInfoFromStorageResult);

        const userSession = readSessionInfoFromStorageResult.success ? readSessionInfoFromStorageResult.userSession : undefined;

        if (userSession === undefined) {
            // todo: show logout modal
            return;
        }

        setUserSession(userSession);

        if (userSession.ActiveWorkspaceInfo !== undefined) {
            //loadWorkspace(userSession.ActiveWorkspaceInfo);
        }

        const localeWorkspaceList = await window.electronAPI.WorkspaceService.GetLocaleWorkspaceList();
        if (localeWorkspaceList.success) {
            setLocaleWorkSpaceList(localeWorkspaceList.workspaceList);
        }


        // todo
        //
        // setActiveWorkspace(activeWorkspace);
    }

    useEffect(() => {
        initialize();
    }, [])

    return (<Layout />);
}
