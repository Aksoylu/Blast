import * as fs from "fs/promises";
import path from "path";

import { FileSystemService } from "./FileSystemService.js";

import { UserSession } from "./Models/Entity/UserSession.js";

/**
 * @typedef {Object} ReadSessionInfoFromStorageResult
 * @property {boolean} result - Boolean indicates that is file exist or not
 * @property {UserSession} userSession
 * @property {string|undefined} [message] - Error message or description
 */

/**
 * @typedef {Object} SaveSessionInfoToStorageResult
 * @property {boolean} result 
 * @property {string|undefined} [message] - Error message or description
 */

const MessageCodes = {
    "SESSION_NOT_EXIST": "USS0000001"
};

export class UserSessionService {
    /** @type {UserSessionService|null} */
    static _instance = null;

    /** @type {FileSystemService|null} */
    #fileSystemService = null;

    constructor() {
        if (UserSessionService._instance) {
            return UserSessionService._instance;
        }
        UserSessionService._instance = this;
    }

    /**
     * @returns {UserSessionService}
    */
    static getInstance() {
        if (!UserSessionService._instance) {
            UserSessionService._instance = new UserSessionService();
        }
        return UserSessionService._instance;
    }

    /**
    * @description: Builder
    * @param {FileSystemService} fileSystemService 
    * @returns 
    */
    InjectDependencies(fileSystemService) {
        this.#fileSystemService = fileSystemService;
        return this;
    }

    /**
     * @description: Reads user session info (Including AppPrefences and User Account Informations) and returns them
     * @returns {Promise<ReadSessionInfoFromStorageResult>}
     */
    async ReadSessionInfoFromStorage() {
        try {
            const blastPath = await this.#fileSystemService.GetBlastPath();
            const sessionFilePath = path.join(blastPath, 'userSession.json');

            const isSessionFileExist = await this.#fileSystemService.IsFileExist(sessionFilePath);
            if (!isSessionFileExist.result) {
                return { success: false, message: MessageCodes.SESSION_NOT_EXIST };
            }

            const jsonString = await fs.readFile(sessionFilePath, 'utf-8');
            const jsonData = JSON.parse(jsonString);

            const userSession = new UserSession(jsonData)
            return { success: true, userSession: userSession };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @todo
     */
    async ReadUserProfilePhotoFromStorage() {

    }

    /**
     * @description: Writes session record to loacle storage
     * @param {UserSession} sessionInfo 
     * @returns {Promise<SaveSessionInfoToStorageResult>}
     */
    async SaveSessionInfoToStorage(sessionInfo) {
        try {
            const blastPath = await this.#fileSystemService.GetBlastPath();
            const sessionFilePath = path.join(blastPath, 'userSession.json');

            this.#fileSystemService.WriteFile(sessionFilePath, JSON.stringify(sessionInfo))
            return { success: true };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * @todo
     */
    async GetSessionInfoFromRemote() {

    }
}
