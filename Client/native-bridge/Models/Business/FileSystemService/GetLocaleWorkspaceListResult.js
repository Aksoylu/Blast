import { Workspace } from "../../Entity/index.js";

export class GetLocaleWorkspaceListResult {
    /** @type {boolean} */
    result = false;

    /** @type {Workspace[]} */
    workspaceList = [];

    /** @type {string|undefined} */
    message = "";

    constructor({ result, workspaceList, message }) {
        this.result = result;
        this.workspaceList = workspaceList;
        this.message = message;
    }
}