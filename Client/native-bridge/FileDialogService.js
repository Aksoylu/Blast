import { dialog } from "electron";
import * as fs from "fs/promises";
import path from "path";

import {
    ReadFileContentAsBinaryResult,
    GetFilePathResult
} from "./Models/Business/index.js";


const MessageCodes = {
    "NO_FILE_PATH_SPECIFIED": "FDS0000001"
};

export class FileDialogService {
    /** @type {FileDialogService|null} */
    static _instance = null;

    constructor() {
        if (FileDialogService._instance) {
            return FileDialogService._instance;
        }
        FileDialogService._instance = this;
    }

    /**
     * @returns {FileDialogService}
     */
    static getInstance() {
        if (!FileDialogService._instance) {
            FileDialogService._instance = new FileDialogService();
        }
        return FileDialogService._instance;
    }

    /**
     * @description: Shows a file dialog then reads choosed file's content as binary buffer
     * @returns {Promise<ReadFileContentAsBinaryResult>}
     */
    async ReadFileContentAsBinary() {
        const result = await dialog.showOpenDialog({
            properties: ['openFile']
        });

        if (result.canceled || result.filePaths.length === 0) {
            return { success: false, message: MessageCodes.NO_FILE_PATH_SPECIFIED };
        }

        const filePath = result.filePaths[0];
        try {
            const content = await fs.readFile(filePath);
            return { success: true, content };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @description: Shows a file dialog then gets choosed file's path as string
     * @returns {Promise<GetFilePathResult>}
     */
    async GetFilePath() {
        const result = await dialog.showOpenDialog({
            properties: ['openFile']
        });

        if (result.canceled || result.filePaths.length === 0) {
            return {
                success: false,
                message: MessageCodes.NO_FILE_PATH_SPECIFIED,
            };
        }

        const filePath = result.filePaths[0];
        const fileName = path.basename(filePath);

        return {
            success: true,
            path: filePath,
            fileName: fileName
        };
    }
}
