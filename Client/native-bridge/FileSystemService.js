import * as fs from "fs/promises";

const MessageCodes = {
     "NO_FILE_PATH_SPECIFIED": "FSS0001"
}

/**
 * @typedef {Object} ReadFileAsBinaryResult
 * @property {boolean} success - Indicates whether the operation was successful or not.
 * @property {string|undefined} [message] - Error message or description
 * @property {Buffer} [content] - Okunan dosyanın içeriği
*/

/**
 * @typedef {Object} IsFileExistResult
 * @property {boolean} result - Boolean indicates that is file exist or not
 * @property {string|undefined} [message] - Error message or description
 */

export class FileSystemService {
    /**
     * @description: Reads file contents from a given file path.
     * @param {string} filePath - Full path to the file to read
     * @returns {Promise<ReadFileAsBinaryResult>}
    */
    static ReadFileAsBinary = async (filePath) => {
        try {
            if (!filePath) {
                return { success: false, message: MessageCodes.NO_FILE_PATH_SPECIFIED };
            }

            const content = await fs.readFile(filePath);
            return { success: true, content };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @description Verilen path'te bir dosya mevcut mu kontrol eder.
     * @param {string} filePath
     * @returns {Promise<IsFileExistResult>}
    */
    static IsFileExist = async (filePath) => {
        try {
            const stat = await fs.stat(filePath);

            return {result: stat.isFile()};
        } catch (error) {
            return {result: false, message: error};
        }
    }
}