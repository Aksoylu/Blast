import { BaseService } from "../Infrastructure/BaseService.js";
import { FileSystemService, WorkspaceService } from "./index.js";
import { ReadLocaleCollectionResult, GetLocaleCollectionListResult } from "../Models/Business/index.js";
import { HttpRequestCollection } from "../Models/Entity/index.js";
import { Base64Utility } from "../Utility/Base64Utility.js";

const ErrorCodes = {
    LoadLocaleCollectionList: {
        CollectionFileNotExist: "CollectionFileNotExist",
        CollectionFileIsCorrupt: "CollectionFileIsCorrupt"
    }
};

export class HttpCollectionService extends BaseService {
    constructor() {
        super();

        /** @type {FileSystemService} */
        this.fileSystemService;

        /** @type {WorkspaceService} */
        this.workspaceService;

        this.InjectDependencies({
            fileSystemService: BaseService.getInstance(FileSystemService),
            workspaceService: BaseService.getInstance(WorkspaceService)
        });
    }

    /**
     * @param {any} _event
     * @param {string} workspaceId
     * @returns {Promise<GetLocaleCollectionListResult>}
     */
    async GetLocaleCollectionList(_event, workspaceId) {
        try {
            const getWorkspacePathResult = await this.workspaceService.GetWorkspacePath();
            if (!getWorkspacePathResult.success) {
                throw new Error(getWorkspacePathResult.message);
            }

            const workspacePath = path.join(getWorkspacePathResult.WorkspacePath, workspaceId)
            // get all file names in folder with extension
            const existingFiles = await this.fileSystemService.GetFiles(workspacePath, ".json");
            if (!existingFiles.success) {
                return [];
            }

            const collectionList = existingFiles.fileList.map(eachFileInfo => new HttpRequestCollection({
                Id: eachFileInfo,
                Name: Base64Utility.Base64Decode(eachFileInfo),
                RequestList: []
            }));

            return new GetLocaleCollectionListResult({success: true, CollectionList:collectionList});
        }
        catch (error) {
            return new GetLocaleCollectionListResult({success: false, message: error.message, CollectionList:[]});
        }
    }

    /**
     * @param {any} _event
     * @param {string} workspaceId
     * @param {string} collectionId
     * @returns {Promise<ReadLocaleCollectionResult>}
     */
    async ReadLocaleCollection(_event, workspaceId, collectionId) {
        try {
            const getWorkspacePathResult = await this.workspaceService.GetWorkspacePath();
            if (!getWorkspacePathResult.success) {
                throw new Error(getWorkspacePathResult.message);
            }

            const workspacePath = path.join(getWorkspacePathResult.WorkspacePath, workspaceId);
            const collectionFilePath = path.join(workspacePath, `${collectionId}.json`);

            const isCollectionFileExist = await this.fileSystemService.IsFileExist(collectionFilePath);
            if (!isCollectionFileExist) {
                throw new Error(ErrorCodes.LoadLocaleCollectionList.CollectionFileNotExist)
            }

            const readFileAsJsonResult = await this.fileSystemService.ReadFileAsJson(sessionFilePath);
            if (!readFileAsJsonResult.success) {
                throw new Error(ErrorCodes.LoadLocaleCollectionList.CollectionFileIsCorrupt);
            }

            const collection = new HttpRequestCollection(readFileAsJsonResult.jsonObject)

            return new ReadLocaleCollectionResult({ success: true, Collection: collection })
        }
        catch (error) {
            return new ReadLocaleCollectionResult({ success: false, message: error.message });
        }
    }


}