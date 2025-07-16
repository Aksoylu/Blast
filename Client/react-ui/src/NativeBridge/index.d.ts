import type {
    CreateDirectoryResult,
    DeleteFileResult,
    GetSubdirectoriesResult,
    WriteFileResult,
    ReadFileAsBinaryResult
} from "./FileSystemService";

import type { ReadFileContentAsBinaryResult, GetFilePathResult } from "./FileDialogService";
import type { ReadSessionInfoFromStorageResult, SaveSessionInfoToStorageResult } from "./UserSessionService";
import type { GetLocaleWorkspaceListResult, CreateLocaleWorkspaceResult } from "./WorkspaceService";

export default interface NativeBridge {
    electronAPI: {
        FileSystemService: {
            GetBlastPath: () => Promise<string>;
            IsDirectoryExist: (path: string) => Promise<boolean>;
            IsFileExist: (path: string) => Promise<boolean>;

            CreateDirectory: (path: string) => Promise<CreateDirectoryResult>;
            DeleteFile: (path: string) => Promise<DeleteFileResult>;
            GetSubdirectories: (path: string) => Promise<GetSubdirectoriesResult>;
            WriteFile: () => Promise<WriteFileResult>;
            ReadFileAsBinary: (path: string) => Promise<ReadFileAsBinaryResult>;

        },
        FileDialogService: {
            ReadFileContentAsBinary: () => Promise<ReadFileContentAsBinaryResult>;
            GetFilePath: () => Promise<GetFilePathResult>;
        },

        UserSessionService: {
            ReadSessionInfoFromStorage: () => Promise<ReadSessionInfoFromStorageResult>;
            SaveSessionInfoToStorage: () => Promise<SaveSessionInfoToStorageResult>;
        },
        WorkspaceService: {
            GetLocaleWorkspaceList: () => Promise<GetLocaleWorkspaceListResult>;
            CreateLocaleWorkspace: (workspaceName: string) => Promise<CreateLocaleWorkspaceResult>;
        }
    };
}