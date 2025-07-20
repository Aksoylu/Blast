import type { BaseOperationResult } from "./Base";

import type {
    CreateDirectoryResult,
    DeleteFileResult,
    GetSubdirectoriesResult,
    WriteFileResult,
    ReadFileAsBinaryResult,
    GetFilesResult,
    IsFileExistResult,
    IsDirectoryExistResult
} from "./FileSystemService";

import type {
    ReadFileContentAsBinaryResult,
    GetFilePathResult
} from "./FileDialogService";

import type {
    ReadSessionInfoFromStorageResult,
    SaveSessionInfoToStorageResult
} from "./UserSessionService";

import type {
    GetLocaleWorkspaceListResult,
    CreateLocaleWorkspaceResult,
    GetWorkspacePathResult
} from "./WorkspaceService";

import type {
    ReadLocaleCollectionResult,
    GetLocaleCollectionListResult
} from "./HttpCollectionService";
import { UserSession } from "#/Models";

export default interface NativeBridge {
    electronAPI: {
        FileSystemService: {
            GetBlastPath: () => Promise<string>;
            IsDirectoryExist: (path: string) => Promise<IsDirectoryExistResult>;
            IsFileExist: (path: string) => Promise<IsFileExistResult>;
            CreateDirectory: (path: string) => Promise<CreateDirectoryResult>;
            DeleteFile: (path: string) => Promise<DeleteFileResult>;
            GetSubdirectories: (path: string) => Promise<GetSubdirectoriesResult>;
            GetFiles: (path: string, fileExtension: string) => Promise<GetFilesResult>;
            ReadFileAsBinary: (path: string) => Promise<ReadFileAsBinaryResult>;
            WriteFile: () => Promise<WriteFileResult>;

        },
        FileDialogService: {
            ReadFileContentAsBinary: () => Promise<ReadFileContentAsBinaryResult>;
            GetFilePath: () => Promise<GetFilePathResult>;
        },

        UserSessionService: {
            ReadSessionInfoFromStorage: () => Promise<ReadSessionInfoFromStorageResult>;
            SaveSessionInfoToStorage: (sessionInfo: UserSession) => Promise<SaveSessionInfoToStorageResult>;
        },
        WorkspaceService: {
            GetWorkspacePath: () => Promise<GetWorkspacePathResult>;
            GetLocaleWorkspaceList: () => Promise<GetLocaleWorkspaceListResult>;
            CreateLocaleWorkspace: (workspaceName: string) => Promise<CreateLocaleWorkspaceResult>;
        },
        HttpCollectionService: {
            ReadLocaleCollection: (workspaceId: string, collectionId: string) => Promise<ReadLocaleCollectionResult>;
            GetLocaleCollectionList: (workspaceId: string) => Promise<GetLocaleCollectionListResult>;
        }
    };
}