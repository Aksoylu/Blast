import { JSX, useEffect } from "react";
import { useMainStore } from "./MainStore";
import Layout from "./Pages/Layout";

export const App = (): JSX.Element => {
    const setBlastPath = useMainStore((state) => state.setBlastPath);
    const setUserSession = useMainStore((state) => state.setUserSession);
    
    const initialize = async () => {
        const detectedBlastPath = await window.electronAPI.FileSystemService.GetBlastPath()
        setBlastPath(detectedBlastPath);

        const sessionInfo = await window.electronAPI.UserSessionService.ReadSessionInfoFromStorage();
        console.log(sessionInfo);
    }

    useEffect(() => {
        initialize();
    })

    return (<Layout />);
}
