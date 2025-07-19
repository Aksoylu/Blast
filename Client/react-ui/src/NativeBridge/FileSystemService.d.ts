import fs from 'fs';

import type { BaseOperationResult } from './Base';

export interface IsFileExistResult extends BaseOperationResult { }

export class IsDirectoryExistResult extends BaseOperationResult { }

export interface CreateDirectoryResult extends BaseOperationResult { }

export interface DeleteFileResult extends BaseOperationResult { }

export interface GetFilesResult extends BaseOperationResult {
    fileList: string[];
}


export interface GetSubdirectoriesResult extends BaseOperationResult {
    directoryList: string[];
}


export interface ReadFileAsBinaryResult extends BaseOperationResult {
    content: Buffer
}

export interface WriteFileResult extends BaseOperationResult { }


