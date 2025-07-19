import { BaseService } from "../Infrastructure/BaseService.js";
import { FileSystemService, WorkspaceService } from "./index.js";
import { LoadLocaleCollectionListResult } from "../Models/Business/index.js";
import { HttpRequestCollection } from "../Models/Entity/index.js";

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
     * @param {string} workspaceKey
     * @param {string} collectionKey
     * @returns {Promise<LoadLocaleCollectionListResult>}
     */
    async LoadLocaleCollectionList(_event, workspaceKey, collectionKey) {
        try {
            const getWorkspacePathResult = await this.workspaceService.GetWorkspacePath();
            if (!getWorkspacePathResult.success) {
                throw new Error(getWorkspacePathResult.message);
            }

            const workspacePath = path.join(getWorkspacePathResult.WorkspacePath, workspaceKey);
            const collectionFilePath = path.join(workspacePath, `${collectionKey}.json`);

            const isCollectionFileExist = await this.fileSystemService.IsFileExist(collectionFilePath);
            if (!isCollectionFileExist) {
                throw new Error(ErrorCodes.LoadLocaleCollectionList.CollectionFileNotExist)
            }

            const readFileAsJsonResult = await this.fileSystemService.ReadFileAsJson(sessionFilePath);
            if (!readFileAsJsonResult.success) {
                throw new Error(ErrorCodes.LoadLocaleCollectionList.CollectionFileIsCorrupt);
            }

            const requestList = new HttpRequestCollection(readFileAsJsonResult.jsonObject)

            return new LoadLocaleCollectionListResult({success: true, })
            // LoadLocaleCollectionListResult
        }
        catch (error) {
            return new LoadLocaleCollectionListResult({ success: false, message: error.message });
        }
    }


}