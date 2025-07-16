import { BaseOperationResult } from "../index.js";

export class ReadFileAsBinaryResult {
    /** @type {boolean} */
    success = false;

    /** @type {Buffer|undefined} */
    content = undefined;

    /** @type {string|undefined} */
    message = "";

    constructor({ success, content, message }) {
        this.success = success;
        this.content = content;
        this.message = message;
    }
}