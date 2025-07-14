export class ReadFileAsBinaryResult {
    /** @type {boolean} */
    result = false;

    /** @type {Buffer|undefined} */
    content = undefined;

    /** @type {string|undefined} */
    message = "";

    constructor({ result, content, message }) {
        this.result = result;
        this.content = content;
        this.message = message;
    }
}