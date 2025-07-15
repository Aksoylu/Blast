import { Workspace } from "../../Entity/index.js";

export class GetLocaleWorkspaceListResult {
    /** @type {boolean} */
    success = false;

    /** @type {Workspace[]} */
    workspaceList = [];

    /** @type {string|undefined} */
    message = "";

    constructor({ success, workspaceList, message }) {
        this.success = success;
        this.workspaceList = workspaceList;
        this.message = message;
    }
}