export { BaseOperationResult } from '../../Infrastructure/BaseOperationResult.js';

/** @FileSystemService */
export { CreateDirectoryResult } from "./FileSystemService/CreateDirectoryResult.js";
export { DeleteFileResult } from "./FileSystemService/DeleteFileResult.js";
export { GetSubdirectoriesResult } from "./FileSystemService/GetSubdirectoriesResult.js";
export { GetFilesResult } from "./FileSystemService/GetFilesResult.js";
export { ReadFileAsBinaryResult } from "./FileSystemService/ReadFileAsBinaryResult.js";
export { WriteFileResult } from "./FileSystemService/WriteFileResult.js";
export { IsDirectoryExistResult } from "./FileSystemService/IsDirectoryExistResult.js";
export { IsFileExistResult } from "./FileSystemService/IsFileExistResult.js";
export { ReadFileAsJsonResult } from "./FileSystemService/ReadFileAsJsonResult.js";

/** @FileDialogService */
export { GetFilePathResult } from "./FileDialogService/GetFilePathResult.js";
export { ReadFileContentAsBinaryResult } from "./FileDialogService/ReadFileContentAsBinaryResult.js";

/** @UserSessionService */
export { ReadSessionInfoFromStorageResult } from "./UserSessionService/ReadSessionInfoFromStorageResult.js";
export { SaveSessionInfoToStorageResult } from "./UserSessionService/SaveSessionInfoToStorageResult.js";

/** @WorkspaceService */
export { GetLocaleWorkspaceListResult } from "./WorkspaceService/GetLocaleWorkspaceListResult.js";
export { CreateLocaleWorkspaceResult } from "./WorkspaceService/CreateLocaleWorkspaceResult.js";
export { GetWorkspacePathResult } from "./WorkspaceService/GetWorkspacePathResult.js";

/** @HttpCollectionService */
export { LoadLocaleCollectionListResult } from "./HttpCollectionService/LoadLocaleCollectionListResult.js";