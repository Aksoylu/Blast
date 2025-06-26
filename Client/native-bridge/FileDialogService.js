import { dialog } from "electron";
import * as fs from "fs/promises";
import path from "path";

const MessageCodes = {
    "NO_FILE_PATH_SPECIFIED": "FDS0001"
}

/**
 * @typedef {Object} ReadFileContentAsBinaryResult
 * @property {boolean} success - Indicates whether the operation was successful or not.
 * @property {string} [message] - Error message or description
 * @property {Buffer} [content] - Readed file content as binary buffer
 */

/**
 * @typedef {Object} GetFilePathResult
 * @property {boolean} success - Indicates whether the operation was successful or not.
 * @property {string} [message] -  Error message or description
 * @property {string|undefined} path - Choosed path as string
 * @property {string|undefined} fileName - Choosed file name
 */

export class FileDialogService {
    /**
     * @description: Shows a file dialog then reads choosed file's content as binary buffer
     * @returns {Promise<ReadFileResult>}
     */
    static ReadFileContentAsBinary = async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile']
        });

        if (result.canceled || result.filePaths.length === 0) {
            return { success: false, message: MessageCodes.NO_FILE_PATH_SPECIFIED };
        }

        const filePath = result.filePaths[0];
        try {
            // Dosyayı Buffer olarak oku
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
    static GetFilePath = async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile']
        });


        if (result.canceled || result.filePaths.length === 0) {
            return { success: false, message: MessageCodes.NO_FILE_PATH_SPECIFIED, };
        }

        const filePath = result.filePaths[0];
        const fileName = path.basename(filePath);

        return { success: true, path: filePath, fileName: fileName };
    }
}