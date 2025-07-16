import { BaseOperationResult } from "../index.js";

export class GetSubdirectoriesResult extends BaseOperationResult {
    /** @type {string[]} */
    directoryList = [];

    constructor({ success, message, directoryList }) {
        super({ success, message });
        this.directoryList = directoryList;
    }
}