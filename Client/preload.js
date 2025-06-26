const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    FileSystemService: {
        ReadFileAsBinary: () => ipcRenderer.invoke('FileSystemService:ReadFileAsBinary'),
        IsFileExist: () => ipcRenderer.invoke('FileSystemService:IsFileExist'),
    },
    FileDialogService: {
        ReadFileContentAsBinary: () => ipcRenderer.invoke('FileDialogService:ReadFileContentAsBinary'),
        GetFilePath: () => ipcRenderer.invoke('FileDialogService:GetFilePath'),
    }
});