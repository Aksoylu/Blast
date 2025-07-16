import path from "path";

import { GetLocaleWorkspaceListResult, CreateLocaleWorkspaceResult } from "./Models/Business/index.js";
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

    /**
     * 
     * @returns {Promise<GetLocaleWorkspaceListResult>}
     */
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
    async CreateLocaleWorkspace(workspaceName) {
        try {
            const blastPath = await this.#fileSystemService.GetBlastPath();

            const workspacePath = path.join(blastPath, 'workspaces');
            const newWorkspaceDirName = this.#base64Encode(workspaceName);
            const newWorkspaceDirPath = path.join(workspacePath, newWorkspaceDirName);
            console.log("newWorkspaceDirPath", newWorkspaceDirPath);

            const getSubDirectoryListResult = await this.#fileSystemService.GetSubdirectories(workspacePath);
            const existingWorkspaceKeys = getSubDirectoryListResult.success ? getSubDirectoryListResult.directoryList : [];
            if (existingWorkspaceKeys.includes(newWorkspaceDirName)) {
                throw new Error(getSubDirectoryListResult.message);
            }

            const createDirectoryResult = await this.#fileSystemService.CreateDirectory(newWorkspaceDirPath);
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