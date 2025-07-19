import { BaseOperationResult } from "../index.js";

export class ReadFileAsBinaryResult extends BaseOperationResult {
    /** @type {Buffer|undefined} */
    content = undefined;

    constructor({ success, message, content }) {
        super({ success, message });
        this.content = content;
    }
}