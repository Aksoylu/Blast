import path from "path";

import { GetLocaleWorkspaceListResult, CreateLocaleWorkspaceResult, IsDirectoryExistResult } from "./Models/Business/index.js";
import { Workspace } from "./Models/Entity/Workspace.js";


export class WorkspaceService {
    #ErrorCodes = {
        CreateLocaleWorkspace: {
            AlreadyExistWithSameName: "AlreadyExistWithSameName"
        }
    }

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

    async #getWorkspacePath() {
        const blastPath = await this.#fileSystemService.GetBlastPath();

        const workspacePath = path.join(blastPath, 'workspaces');
        const isWorkspacePathExist = await this.#fileSystemService.IsDirectoryExist(workspacePath);

        if (!isWorkspacePathExist.success) {
            await this.#fileSystemService.CreateDirectory(workspacePath);
        }

        return workspacePath;
    }

    /**
     * 
     * @returns {Promise<GetLocaleWorkspaceListResult>}
     */
    async GetLocaleWorkspaceList() {
        try {
            const workspacePath = await this.#getWorkspacePath();

            const getSubDirectoryListResult = await this.#fileSystemService.GetSubdirectories(workspacePath);
            if (!getSubDirectoryListResult.success) {
                throw new Error(getSubDirectoryListResult.message);
            }

            const workspaceList = [];
            for (let i = 0; i < getSubDirectoryListResult.directoryList.length; i++) {
                const eachDirName = getSubDirectoryListResult.directoryList[i];
                const workspaceName = this.#base64Decode(eachDirName);
                const newWorkspace = new Workspace({ Name: workspaceName, Storage: "locale", Key: eachDirName });

                workspaceList.push(newWorkspace);
            }

            return new GetLocaleWorkspaceListResult({ success: true, workspaceList: workspaceList })
        }
        catch (error) {
            return new GetLocaleWorkspaceListResult({ success: false, message: error.message });
        }
    }

    /**
     * 
     * @param {string} workspaceName 
     * @returns {Promise<CreateLocaleWorkspaceResult>}
     */
    async CreateLocaleWorkspace(_event, workspaceName) {
        try {
            const newWorkspaceKey = this.#base64Encode(workspaceName);

            const existingWorkspaces = await this.GetLocaleWorkspaceList();
            if (!existingWorkspaces.success) {
                throw new Error(existingWorkspaces.message);
            }

            const existingWorkspaceKeys = existingWorkspaces.workspaceList.map(item => item.Key);
            if (existingWorkspaceKeys.includes(newWorkspaceKey)) {
                throw new Error(this.#ErrorCodes.CreateLocaleWorkspace.AlreadyExistWithSameName);
            }

            const workspacePath = await this.#getWorkspacePath();
            const newWorkspacePath = path.join(workspacePath, newWorkspaceKey);
            const createDirectoryResult = await this.#fileSystemService.CreateDirectory(newWorkspacePath);
            if (!createDirectoryResult.success) {
                throw new Error(createDirectoryResult.message);
            }

            return new CreateLocaleWorkspaceResult({ success: true });
        }
        catch (error) {
            return new CreateLocaleWorkspaceResult({ success: false, message: error.message });
        }
    }

    #base64Encode(text) {
        return Buffer.from(text, 'utf-8').toString('base64');
    }

    #base64Decode(base64) {
        return Buffer.from(base64, 'base64').toString('utf-8');
    }

}