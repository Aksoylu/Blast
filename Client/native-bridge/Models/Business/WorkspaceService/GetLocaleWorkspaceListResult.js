import { BaseOperationResult } from "../index.js";
import { Workspace } from "../../Entity/index.js";

export class GetLocaleWorkspaceListResult extends BaseOperationResult {
    /** @type {Workspace[]} */
    workspaceList = [];

    constructor({ success, message, workspaceList }) {
        super({ success, message });
        this.workspaceList = workspaceList;
    }
}