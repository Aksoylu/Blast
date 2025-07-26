const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    FileSystemService: {
        GetBlastPath: () => ipcRenderer.invoke('FileSystemService:GetBlastPath'),

        IsFileExist: (path) => ipcRenderer.invoke('FileSystemService:IsFileExist', path),
        IsDirectoryExist: (path) => ipcRenderer.invoke('FileSystemService:IsDirectoryExist', path),
        CreateDirectory: (path) => ipcRenderer.invoke('FileSystemService:CreateDirectory', path),
        DeleteFile: (path) => ipcRenderer.invoke('FileSystemService:DeleteFile', path),
        GetSubdirectories: (path) => ipcRenderer.invoke('FileSystemService:GetSubdirectories', path),
        GetFiles: (path, fileExtension) => ipcRenderer.invoke('FileSystemService:GetFiles', path, fileExtension),
        ReadFileAsBinary: (path) => ipcRenderer.invoke('FileSystemService:ReadFileAsBinary', path),
        WriteFile: (path, content) => ipcRenderer.invoke('FileSystemService:WriteFile', path, content)
    },
    FileDialogService: {
        GetFilePath: () => ipcRenderer.invoke('FileDialogService:GetFilePath'),
        ReadFileContentAsBinary: () => ipcRenderer.invoke('FileDialogService:ReadFileContentAsBinary')
    },
    UserSessionService: {
        ReadSessionInfoFromStorage: () => ipcRenderer.invoke('UserSessionService:ReadSessionInfoFromStorage'),
        SaveSessionInfoToStorage: (userSession) => ipcRenderer.invoke('UserSessionService:SaveSessionInfoToStorage', userSession)
    },
    WorkspaceService: {
        GetWorkspacePath: () => ipcRenderer.invoke('WorkspaceService:GetWorkspacePath'),
        GetLocaleWorkspaceList: () => ipcRenderer.invoke('WorkspaceService:GetLocaleWorkspaceList'),
        CreateLocaleWorkspace: (workspaceName) => ipcRenderer.invoke('WorkspaceService:CreateLocaleWorkspace', workspaceName)
    },
    HttpCollectionService: {
        ReadLocaleCollection: (workspaceId, collectionId) => ipcRenderer.invoke('HttpCollectionService:ReadLocaleCollection', workspaceId, collectionId),
        GetLocaleCollectionList: (workspaceId) => ipcRenderer.invoke('HttpCollectionService:GetLocaleCollectionList', workspaceId)
    }
});