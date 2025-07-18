import path from "path";

import {
    GetLocaleWorkspaceListResult,
    CreateLocaleWorkspaceResult,
    LoadLocaleWorkspaceInfo
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
            const workspacePath = await this.#getWorkspacePath();

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

            const workspacePath = await this.#getWorkspacePath();
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
     * @param {*} _event 
     * @param {string} workspaceKey
     */
    async LoadLocaleWorkspaceInfo(_event, workspaceKey) {
        try {

        }
        catch (error) {
            return new LoadLocaleWorkspaceInfo({ success: false, message: error.message });
        }
    }

    async #getWorkspacePath() {
        const blastPath = await this.fileSystemService.GetBlastPath();
        console.log("getWorkspacePath || blastPath >>", blastPath);

        const workspacePath = path.join(blastPath, 'workspaces');
        const isWorkspacePathExist = await this.fileSystemService.IsDirectoryExist(workspacePath);

        if (!isWorkspacePathExist.success) {
            await this.fileSystemService.CreateDirectory(workspacePath);
        }

        return workspacePath;
    }
}