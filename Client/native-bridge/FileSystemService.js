import fs from 'fs/promises';
import os from 'os';
import path from 'path';

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

/**
 * @typedef {Object} DeleteFileResult
 * @property {boolean} result - Boolean indicates that is operation successfull or not
 * @property {string|undefined} [message] - Error message or description
 */

/**
 * @typedef {Object} OverwriteFileResult
 * @property {boolean} result - Boolean indicates that is operation successfull or not
 * @property {string|undefined} [message] - Error message or description
 */


export class FileSystemService {
    /** @type {FileSystemService|null} */
    static _instance = null;

    /** @type {string|null} */
    #blastPath = null;

    constructor() {
        if (FileSystemService._instance) {
            return FileSystemService._instance;
        }
        FileSystemService._instance = this;
    }

    /**
     * @returns {FileSystemService}
     */
    static getInstance() {
        if (!FileSystemService._instance) {
            FileSystemService._instance = new FileSystemService();
        }
        return FileSystemService._instance;
    }

    /**
     * @param {string} filePath
     * @returns {Promise<ReadFileAsBinaryResult>}
     */
    async ReadFileAsBinary(filePath) {
        try {
            if (!filePath) {
                return { success: false, message: 'NO_FILE_PATH_SPECIFIED' };
            }

            const content = await fs.readFile(filePath);
            return { success: true, content };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<IsFileExistResult>}
     */
    async IsFileExist(filePath) {
        try {
            const stat = await fs.stat(filePath);
            return { result: stat.isFile() };
        } catch (error) {
            return { result: false, message: error.message };
        }
    }

    /**
     * @returns {Promise<string>}
     */
    async GetBlastPath() {
        if (this.#blastPath != null) {
            return this.#blastPath;
        }

        const homeDir = os.homedir();
        const blastDir = path.join(homeDir, '.blast');

        try {
            await fs.access(blastDir);
        } catch (error) {
            await fs.mkdir(blastDir, { recursive: true });
        }

        this.#blastPath = blastDir;
        return this.#blastPath;
    }

    /**
     * @param {string} filePath
     * @returns {Promise<DeleteFileResult>}
     */
    async DeleteFile(filePath) {
        try {
            await fs.unlink(filePath);
            return { result: true };
        } catch (error) {
            return { result: false, message: error.message };
        }
    }

    /**
     * @description: Writes file to specified path
     * @param {string} filePath
     * @param {string | Buffer} content
     * @returns {Promise<OverwriteFileResult>}
     */
    async WriteFile(filePath, content) {
        try {
            await fs.writeFile(filePath, content);
            return { result: true };
        } catch (error) {
            return { result: false, message: error.message };
        }
    }

}
