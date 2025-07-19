import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import {
    CreateDirectoryResult,
    DeleteFileResult,
    GetSubdirectoriesResult,
    GetFilesResult,
    ReadFileAsBinaryResult,
    WriteFileResult,
    IsDirectoryExistResult,
    IsFileExistResult,
    ReadFileAsJsonResult
} from "../Models/Business/index.js";

import { BaseService } from "../Infrastructure/BaseService.js";

const ErrorCodes = {
    ReadFileAsBinary: {
        NoFilePathSpecified: "NoFilePathSpecified"
    },
    ReadFileAsJson: {
        NoFilePathSpecified: "NoFilePathSpecified"
    }
};

export class FileSystemService extends BaseService {
    /** @type {string|null} */
    blastPath = null;

    /**
     * @returns {Promise<string>}
     */
    async GetBlastPath() {
        if (this.blastPath != null) {
            return this.blastPath;
        }

        const homeDir = os.homedir();
        const blastDir = path.join(homeDir, '.blast');

        try {
            await fs.access(blastDir);
        } catch (error) {
            await fs.mkdir(blastDir, { recursive: true });
        }

        this.blastPath = blastDir;

        return this.blastPath;
    }


    /**
     * @param {string} dirPath
     * @returns {Promise<IsDirectoryExistResult>}
     */
    async IsDirectoryExist(dirPath) {
        try {
            const stat = await fs.stat(dirPath);
            return new IsDirectoryExistResult({ success: stat.isDirectory() });
        } catch (error) {
            return new IsDirectoryExistResult({ success: false, message: error });
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<IsFileExistResult>}
     */
    async IsFileExist(filePath) {
        try {
            const stat = await fs.stat(filePath);
            return new IsFileExistResult({ success: stat.isFile() });
        } catch (error) {
            return new IsFileExistResult({ success: false, message: error });
        }
    }


    /**
     * @param {string} dirPath
     * @returns {Promise<CreateDirectoryResult>}
     */
    async CreateDirectory(dirPath) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
            return new CreateDirectoryResult({ success: true });
        } catch (error) {
            return new CreateDirectoryResult({ success: false, message: error.message });
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<DeleteFileResult>}
     */
    async DeleteFile(filePath) {
        try {
            await fs.unlink(filePath);
            return new DeleteFileResult({ success: true });
        } catch (error) {
            return new DeleteFileResult({ success: false, message: error.message });
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
     * @param {string} dirPath
     * @param {string?} fileExtension
     * @returns {Promise<GetFilesResult>}
    */
    async GetFiles(dirPath, fileExtension = ".json") {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            const foundFileList = entries
                .filter(entry => entry.isFile() && entry.name.endsWith(fileExtension))
                .map(entry => entry.name);

            return new GetFilesResult({ success: true, fileList: foundFileList });
        } catch (error) {
            return new GetFilesResult({ success: false, message: error.message });
        }
    }


    /**
     * @param {string} filePath
     * @returns {Promise<ReadFileAsBinaryResult>}
     */
    async ReadFileAsBinary(filePath) {
        try {
            if (!filePath) {
                throw new Error(ErrorCodes.ReadFileAsBinary.NoFilePathSpecified);
            }

            const content = await fs.readFile(filePath);

            return new ReadFileAsBinaryResult({ success: true, content });
        } catch (error) {
            return new ReadFileAsBinaryResult({ success: false, message: error.message });
        }
    }

    /**
     * 
     * @param {string} filePath 
     * @returns {Promise<ReadFileAsJsonResult>}
     */
    async ReadFileAsJson(filePath) {
        try {
            if (!filePath) {
                throw new Error(ErrorCodes.ReadFileAsJson.NoFilePathSpecified);
            }

            const jsonString = await fs.readFile(filePath, 'utf-8');
            const jsonObject = JSON.parse(jsonString);

            return new ReadFileAsJsonResult({ success: true, jsonObject });
        } catch (error) {
            return new ReadFileAsJsonResult({ success: false, message: error.message });
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
            return new WriteFileResult({ success: true });
        } catch (error) {
            return new WriteFileResult({ success: false, message: error.message });
        }
    }
}
