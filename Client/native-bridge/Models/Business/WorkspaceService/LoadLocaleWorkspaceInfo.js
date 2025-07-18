import { BaseOperationResult } from "../index.js";
import { Workspace } from "../../Entity/index.js";

export class LoadLocaleWorkspaceInfo extends BaseOperationResult {
    /** @type {Workspace[]} */
    requestCollectionList = [];

    constructor({ success, message, requestCollectionList }) {
        super({ success, message });
        this.requestCollectionList = requestCollectionList;
    }
}