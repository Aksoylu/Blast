import { BaseOperationResult } from "../index.js";

export class GetFilePathResult extends BaseOperationResult {
    /** @type {string|undefined} */
    path = "";

    /** @type {string|undefined} */
    fileName = "";

    constructor({ success, message, path, fileName }) {
        super({ success, message });
        this.path = path;
        this.fileName = fileName;
    }
}