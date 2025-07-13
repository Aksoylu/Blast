import type { ReadFileAsBinaryResult, IsFileExistResult } from "./FileSystemService";
import type { ReadFileContentAsBinaryResult, GetFilePathResult } from "./FileDialogService";
import type { ReadSessionInfoFromStorageResult, SaveSessionInfoToStorageResult } from "./UserSessionService";

export default interface NativeBridge {
    electronAPI: {
        FileSystemService: {
            ReadFileAsBinary: (path: string) => Promise<ReadFileAsBinaryResult>;
            IsFileExist: (path: string) => Promise<IsFileExistResult>;
            GetBlastPath: () => Promise<string>;
        },
        FileDialogService: {
            ReadFileContentAsBinary: () => Promise<ReadFileContentAsBinaryResult>;
            GetFilePath: () => Promise<GetFilePathResult>;
        },

        UserSessionService: {
            ReadSessionInfoFromStorage: () => Promise<ReadSessionInfoFromStorageResult>;
            SaveSessionInfoToStorage: () => Promise<>;
        }
    };
}