export class ReadFileContentAsBinaryResult {
    /** @type {boolean} */
    success = false;

    /** @type {string|undefined} */
    message = "";

    /** @type {Buffer|undefined} */
    content = undefined;

    constructor({ success, message, content }) {
        this.success = success;
        this.message = message;
        this.content = content;
    }
}