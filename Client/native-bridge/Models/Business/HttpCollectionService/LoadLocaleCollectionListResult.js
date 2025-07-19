import { HttpRequestCollection } from "../../Entity/index.js";
import { BaseOperationResult } from "../index.js";

export class LoadLocaleCollectionListResult extends BaseOperationResult {
    /** @type {string} | @description: Parent workspace's key */
    ParentWorkspaceKey = "";

    /** @type {HttpRequestCollection[]} */
    CollectionList = []

    constructor({ success, message, ParentWorkspaceKey, CollectionList }) {
        super({ success, message });
        this.ParentWorkspaceKey = ParentWorkspaceKey;
        this.CollectionList = CollectionList;
    }
}