import { BaseOperationResult } from "../index.js";

export class GetFilesResult extends BaseOperationResult {
    /** @type {string[]} */
    fileList = [];

    constructor({ success, message, fileList }) {
        super({ success, message });
        this.fileList = fileList;
    }
}