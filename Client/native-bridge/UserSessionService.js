import * as fs from "fs/promises";
import path from "path";

import { FileSystemService } from "./FileSystemService.js";

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
     * @description: todo
    */
    async ReadSessionInfoFromStorage () {
        const blastPath = await this.#fileSystemService.GetBlastPath();
        const sessionFilePath = path.join(blastPath, 'userSession.json');
        console.log("blastDir >>", sessionFilePath);
        
        try {
            if (!blastDir) {
                return { success: false, message: "MessageCodes.NO_FILE_PATH_SPECIFIED" };
            }

            const content = await fs.readFile(blastDir);
            return { success: true, content };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
