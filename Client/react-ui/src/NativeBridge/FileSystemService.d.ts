import fs from 'fs';

export interface CreateDirectoryResult {
    success: boolean;
    message?: string;
}

export interface DeleteFileResult {
    success: boolean;
    message?: string;
}

export interface GetSubdirectoriesResult {
    success: boolean;
    directoryList: string[];
    message?: string;
}

export interface ReadFileAsBinaryResult {
    success: boolean;
    message?: string;
    content: Buffer
}

export interface WriteFileResult {
    success: boolean;
    message?: string;
}
