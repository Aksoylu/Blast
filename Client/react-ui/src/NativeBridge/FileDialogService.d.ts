import type { BaseOperationResult } from './Base';

export interface GetFilePathResult extends BaseOperationResult{
    path?: string;
    fileName?: string;
}

export interface ReadFileContentAsBinaryResult extends BaseOperationResult{
    content?: Buffer;
}
