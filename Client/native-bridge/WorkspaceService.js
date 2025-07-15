import * as fs from "fs/promises";
import path from "path";

import { GetLocaleWorkspaceListResult } from "./Models/Business/index.js";

export class WorkspaceService {
    /** @type {WorkspaceService|null} */
    static _instance = null;

    /** @type {FileSystemService|null} */
    #fileSystemService = null;

    constructor() {
        if (WorkspaceService._instance) {
            return WorkspaceService._instance;
        }
        WorkspaceService._instance = this;
    }

    /**
     * @returns {WorkspaceService}
    */
    static getInstance() {
        if (!WorkspaceService._instance) {
            WorkspaceService._instance = new WorkspaceService();
        }
        return WorkspaceService._instance;
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

    async GetLocaleWorkspaceList() {
        try {
            const blastPath = await this.#fileSystemService.GetBlastPath();

            const workspacePath = path.join(blastPath, 'workspaces');
            const isWorkspacePathExist = await this.#fileSystemService.IsDirectoryExist(workspacePath);
            if (!isWorkspacePathExist.result) {
                await this.#fileSystemService.CreateDirectory(workspacePath);
            }

            const getSubDirectoryListResult = await this.#fileSystemService.GetSubdirectories(workspacePath);
            if (!getSubDirectoryListResult.success) {
                return new GetLocaleWorkspaceListResult({ success: false, workspaceList: [], message: getSubDirectoryListResult.message })
            }
            
            return new GetLocaleWorkspaceListResult({ success: true, workspaceList: getSubDirectoryListResult.directoryList})
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }


}