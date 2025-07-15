export interface GetFilePathResult {
    success: boolean;
    message?: string;
    path?: string;
    fileName?: string;
}

export interface ReadFileContentAsBinaryResult {
    success: boolean;
    message?: string;
    content?: Buffer;
}
