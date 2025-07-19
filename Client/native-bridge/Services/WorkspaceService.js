import path from "path";

import {
    GetLocaleWorkspaceListResult,
    CreateLocaleWorkspaceResult,
    GetWorkspacePathResult
} from "../Models/Business/index.js";
import { Workspace } from "../Models/Entity/Workspace.js";

import { Base64Utility } from "../Utility/index.js";

import { BaseService } from "../Infrastructure/BaseService.js"
import { FileSystemService } from "./FileSystemService.js";

const ErrorCodes = {
    CreateLocaleWorkspace: {
        AlreadyExistWithSameName: "AlreadyExistWithSameName"
    },
    LoadLocaleWorkspace: {
        DetailsNotFound: "DetailsNotFound"
    }
};

export class WorkspaceService extends BaseService {
    constructor() {
        super();

        /** @type {FileSystemService} */
        this.fileSystemService;

        this.InjectDependencies({
            fileSystemService: BaseService.getInstance(FileSystemService)
        });
    }

    /**
     * 
     * @returns {Promise<GetLocaleWorkspaceListResult>}
     */
    async GetLocaleWorkspaceList() {
        try {
            const getWorkspacePathResult = await this.GetWorkspacePath();
            if (!getWorkspacePathResult.success) {
                throw new Error(getWorkspacePathResult.message);
            }

            const workspacePath = getWorkspacePathResult.WorkspacePath;

            const getSubDirectoryListResult = await this.fileSystemService.GetSubdirectories(workspacePath);
            if (!getSubDirectoryListResult.success) {
                throw new Error(getSubDirectoryListResult.message);
            }

            const workspaceList = [];
            for (let i = 0; i < getSubDirectoryListResult.directoryList.length; i++) {
                const eachDirName = getSubDirectoryListResult.directoryList[i];
                const workspaceName = Base64Utility.Base64Decode(eachDirName);
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
            const newWorkspaceKey = Base64Utility.Base64Encode(workspaceName);

            const existingWorkspaces = await this.GetLocaleWorkspaceList();
            if (!existingWorkspaces.success) {
                throw new Error(existingWorkspaces.message);
            }

            const existingWorkspaceKeys = existingWorkspaces.workspaceList.map(item => item.Key);
            if (existingWorkspaceKeys.includes(newWorkspaceKey)) {
                throw new Error(ErrorCodes.CreateLocaleWorkspace.AlreadyExistWithSameName);
            }

            const getWorkspacePathResult = await this.GetWorkspacePath();
            if (!getWorkspacePathResult.success) {
                throw new Error(getWorkspacePathResult.message);
            }

            const workspacePath = getWorkspacePathResult.WorkspacePath;

            const newWorkspacePath = path.join(workspacePath, newWorkspaceKey);
            const createDirectoryResult = await this.fileSystemService.CreateDirectory(newWorkspacePath);
            if (!createDirectoryResult.success) {
                throw new Error(createDirectoryResult.message);
            }

            return new CreateLocaleWorkspaceResult({ success: true });
        }
        catch (error) {
            return new CreateLocaleWorkspaceResult({ success: false, message: error.message });
        }
    }

    /**
     * 
     * @returns {Promise<GetWorkspacePathResult>}
     */
    async GetWorkspacePath() {
        try {
            const blastPath = await this.fileSystemService.GetBlastPath();
            const workspacePath = path.join(blastPath, 'workspaces');

            const isDirectoryExistResult = await this.fileSystemService.IsDirectoryExist(workspacePath);
            if (!isDirectoryExistResult.success) {
                await this.fileSystemService.CreateDirectory(workspacePath);
            }

            return new GetWorkspacePathResult({ success: true, WorkspacePath: workspacePath })
        }
        catch (error) {
            return new GetWorkspacePathResult({ success: false, message: error.message });
        }
    }
}