import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import {
    CreateDirectoryResult,
    DeleteFileResult,
    GetSubdirectoriesResult,
    ReadFileAsBinaryResult,
    WriteFileResult
} from "./Models/Business/index.js";


export class FileSystemService {
    #ErrorCodes = {
        ReadSessionInfoFromStorage: {
            SessionNotExist: "SessionNotExist"
        }
    }

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
     * @param {string} dirPath
     * @returns {Promise<boolean>}
     */
    async IsDirectoryExist(dirPath) {
        try {
            const stat = await fs.stat(dirPath);
            return stat.isDirectory();
        } catch (error) {
            return false;
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<boolean>}
     */
    async IsFileExist(filePath) {
        try {
            const stat = await fs.stat(filePath);
            return stat.isFile();
        } catch (error) {
            return false;
        }
    }


    /**
     * @param {string} dirPath
     * @returns {Promise<CreateDirectoryResult>}
     */
    async CreateDirectory(dirPath) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<DeleteFileResult>}
     */
    async DeleteFile(filePath) {
        try {
            await fs.unlink(filePath);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @param {string} dirPath
     * @returns {Promise<GetSubdirectoriesResult>}
    */
    async GetSubdirectories(dirPath) {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            const foundDirectoryList = entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name);

            return new GetSubdirectoriesResult({ success: true, directoryList: foundDirectoryList });
        } catch (error) {
            return new GetSubdirectoriesResult({ success: false, message: error.message });
        }
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
            return new ReadFileAsBinaryResult({ success: true, content });
        } catch (error) {
            return new ReadFileAsBinaryResult({ success: false, message: error.message });
        }
    }

    /**
     * @description: Writes file to specified path
     * @param {string} filePath
     * @param {string | Buffer} content
     * @returns {Promise<WriteFileResult>}
     */
    async WriteFile(filePath, content) {
        try {
            await fs.writeFile(filePath, content);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
