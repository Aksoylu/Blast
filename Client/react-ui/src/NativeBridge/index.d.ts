import type { ReadFileAsBinaryResult, IsFileExistResult } from "./FileSystemService";
import type { ReadFileContentAsBinaryResult, GetFilePathResult } from "./FileDialogService";

export default interface NativeBridge {
    electronAPI: {
        FileSystemService: {
            ReadFileAsBinary: () => Promise<ReadFileAsBinaryResult>;
            IsFileExist: () => Promise<IsFileExistResult>;
        },
        FileDialogService: {
            ReadFileContentAsBinary: () => Promise<ReadFileContentAsBinaryResult>;
            GetFilePath: () => Promise<GetFilePathResult>;
        }
    };
}