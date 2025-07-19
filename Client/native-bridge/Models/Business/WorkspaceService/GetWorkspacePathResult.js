import { BaseOperationResult } from "../index.js";

export class GetWorkspacePathResult extends BaseOperationResult {
    /** @type {string} */
    WorkspacePath = [];

    constructor({ success, message, WorkspacePath }) {
        super({ success, message });
        this.WorkspacePath = WorkspacePath;
    }
}