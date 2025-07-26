import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import { BaseService } from "../Infrastructure/BaseService.js";
import { FileSystemService, WorkspaceService } from "./index.js";
import { ReadLocaleCollectionResult, GetLocaleCollectionListResult } from "../Models/Business/index.js";
import { HttpRequestCollection, HttpRequestFolder, HttpRequestObject } from "../Models/Entity/index.js";
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
            const getFilesResult = await this.fileSystemService.GetFiles(workspacePath, ".json");

            if (!getFilesResult.success) {
                return [];
            }

            const collectionList = [];

            const fileList = getFilesResult.fileList;
            for (let i = 0; i < fileList.length; i++) {
                const eachFileName = fileList[i];
                const eachFilePath = path.join(workspacePath, eachFileName);
                const fileId = eachFileName.replace(".json", "");

                const readFileResult = await this.fileSystemService.ReadFileAsJson(eachFilePath);
                if (!readFileResult.success) {
                    continue;
                }

                /** @type {(HttpRequestCollection|HttpRequestObject)[]} */
                const itemList = readFileResult.jsonObject.map(eachItem => this.#parseCollectionEntity(eachItem));

                const eachollection = new HttpRequestCollection({
                    Id: fileId,
                    Name: Base64Utility.Base64Decode(fileId),
                    Items: itemList
                });

                collectionList.push(eachollection);
            }

            console.log(JSON.stringify(collectionList));
            return new GetLocaleCollectionListResult({ success: true, CollectionList: collectionList });
        }
        catch (error) {
            console.log(error);
            return new GetLocaleCollectionListResult({ success: false, message: error.message, CollectionList: [] });
        }
    }

    /**
     * 
     * @param {HttpRequestCollection|HttpRequestObject|HttpRequestFolder} input 
     * @returns {HttpRequestObject|HttpRequestCollection|HttpRequestFolder|null}
     */
    #parseCollectionEntity = (input) => {
        switch (input.EntityType) {
            case "http_request":
                return new HttpRequestObject({
                    Id: input.Id,
                    Name: input.Name,
                    RequestType: input.RequestType,
                    QueryParameters: input.QueryParameters,
                    Headers: input.QueryParameters,
                    Body: input.Body
                });

            case "collection":
                return new HttpRequestCollection({
                    Id: input.Id,
                    Name: input.Name,
                    Items: input.Items.map(item => this.#parseCollectionEntity(item))
                });
            case "folder":
                return new HttpRequestFolder({
                    Id: input.Id,
                    Name: input.Name,
                    Items: input.Items.map(item => this.#parseCollectionEntity(item))
                });
            default:
                return null;
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