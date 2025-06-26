import fs from 'fs';

export interface ReadFileAsBinaryResult {
    success: boolean;
    message?: string;
    content: Buffer
}

export interface IsFileExistResult {
    result: boolean;
    message?: string;
}
