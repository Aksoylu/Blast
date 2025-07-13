const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    FileSystemService: {
        ReadFileAsBinary: (path) => ipcRenderer.invoke('FileSystemService:ReadFileAsBinary', path),
        IsFileExist: (path) => ipcRenderer.invoke('FileSystemService:IsFileExist', path),
        GetBlastPath: () => ipcRenderer.invoke('FileSystemService:GetBlastPath')
    },
    FileDialogService: {
        ReadFileContentAsBinary: () => ipcRenderer.invoke('FileDialogService:ReadFileContentAsBinary'),
        GetFilePath: () => ipcRenderer.invoke('FileDialogService:GetFilePath')
    },
    UserSessionService: {
        ReadSessionInfoFromStorage: () => ipcRenderer.invoke('UserSessionService:ReadSessionInfoFromStorage'),
        SaveSessionInfoToStorage: (userSession) => ipcRenderer.invoke('UserSessionService:SaveSessionInfoToStorage', userSession)
    }
});