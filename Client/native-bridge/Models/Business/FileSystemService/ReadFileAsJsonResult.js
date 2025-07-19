import { BaseOperationResult } from "../index.js";

export class ReadFileAsJsonResult extends BaseOperationResult {
    /** @type {object} */
    jsonObject = {};

    constructor({ success, message, jsonObject }) {
        super({ success, message });
        this.jsonObject = jsonObject;
    }
}