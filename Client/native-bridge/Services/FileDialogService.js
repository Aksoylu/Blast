import { dialog } from "electron";
import * as fs from "fs/promises";
import path from "path";

import {
    ReadFileContentAsBinaryResult,
    GetFilePathResult
} from "../Models/Business/index.js";

import { BaseService } from "../Infrastructure/BaseService.js";
import { FileSystemService } from "./FileSystemService.js";


const ErrorCodes = {
    ReadFileContentAsBinary: {
        NoFilePathSpecified: "NoFilePathSpecified"
    },
    GetFilePath: {
        NoFilePathSpecified: "NoFilePathSpecified"
    }
};

export class FileDialogService extends BaseService {
    constructor() {
        super();

        /** @type {FileSystemService} */
        this.fileSystemService;

        this.InjectDependencies({
            fileSystemService: BaseService.getInstance(FileSystemService)
        });
    }

    /**
     * @description: Shows a file dialog then reads choosed file's content as binary buffer
     * @returns {Promise<ReadFileContentAsBinaryResult>}
     */
    async ReadFileContentAsBinary() {
        try {
            const result = await dialog.showOpenDialog({
                properties: ['openFile']
            });

            if (result.canceled || result.filePaths.length === 0) {
                throw new Error(ErrorCodes.ReadFileContentAsBinary.NoFilePathSpecified);
            }

            const filePath = result.filePaths[0];

            const readedFileContent = await fs.readFile(filePath);

            return new ReadFileContentAsBinaryResult({ success: true, content: readedFileContent });
        } catch (error) {
            return new ReadFileContentAsBinaryResult({ success: false, message: error.message });
        }
    }

    /**
     * @description: Shows a file dialog then gets choosed file's path as string
     * @returns {Promise<GetFilePathResult>}
     */
    async GetFilePath() {
        try {
            const result = await dialog.showOpenDialog({
                properties: ['openFile']
            });

            if (result.canceled || result.filePaths.length === 0) {
                throw new Error(ErrorCodes.GetFilePath.NoFilePathSpecified);
            }

            const filePath = result.filePaths[0];
            const fileName = path.basename(filePath);

            return new GetFilePathResult({ success: true, path: filePath, fileName: fileName });
        }
        catch (error) {
            return new GetFilePathResult({ success: false, message: error.message });
        }
    }
}
