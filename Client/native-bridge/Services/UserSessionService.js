import * as fs from "fs/promises";
import path from "path";

import { ReadSessionInfoFromStorageResult, SaveSessionInfoToStorageResult } from "../Models/Business/index.js";
import { UserSession } from "../Models/Entity/UserSession.js";

import { BaseService } from "../Infrastructure/BaseService.js"
import { FileSystemService } from "./FileSystemService.js";

const ErrorCodes = {
    ReadSessionInfoFromStorage: {
        SessionNotExist: "SessionNotExist"
    }
};

export class UserSessionService extends BaseService {
    constructor() {
        super();

        /** @type {FileSystemService} */
        this.fileSystemService;

        this.InjectDependencies({
            fileSystemService: BaseService.getInstance(FileSystemService)
        });
    }

    /**
     * @description: Reads user session info (Including AppPrefences and User Account Informations) and returns them
     * @returns {Promise<ReadSessionInfoFromStorageResult>}
     */
    async ReadSessionInfoFromStorage() {
        try {
            const blastPath = await this.fileSystemService.GetBlastPath();
            console.log("ReadSessionInfoFromStorage || blastPath >>", blastPath);
            const sessionFilePath = path.join(blastPath, 'userSession.json');

            const isSessionFileExist = await this.fileSystemService.IsFileExist(sessionFilePath);
            if (!isSessionFileExist) {
                throw new Error(ErrorCodes.ReadSessionInfoFromStorage.SessionNotExist)
            }

            const jsonString = await fs.readFile(sessionFilePath, 'utf-8');
            const jsonData = JSON.parse(jsonString);

            const userSession = new UserSession(jsonData)
            return new ReadSessionInfoFromStorageResult({ success: true, userSession: userSession });
        }
        catch (error) {
            return new ReadSessionInfoFromStorageResult({ success: false, message: error.message });
        }
    }

    /**
     * @description: Writes session record to loacle storage
     * @param {UserSession} sessionInfo 
     * @returns {Promise<SaveSessionInfoToStorageResult>}
     */
    async SaveSessionInfoToStorage(sessionInfo) {
        try {
            const blastPath = await this.fileSystemService.GetBlastPath();
            const sessionFilePath = path.join(blastPath, 'userSession.json');

            this.fileSystemService.WriteFile(sessionFilePath, JSON.stringify(sessionInfo))
            return new SaveSessionInfoToStorageResult({ success: true });
        }
        catch (error) {
            return new SaveSessionInfoToStorageResult({ success: false, message: error.message });
        }
    }

    /**
     * @todo
     */
    async GetSessionInfoFromRemote() {

    }
}
