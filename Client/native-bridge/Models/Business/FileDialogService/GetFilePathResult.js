export class GetFilePathResult {
    /** @type {boolean} */
    success = false;

    /** @type {string|undefined} */
    message = "";

    /** @type {string|undefined} */
    path = "";

    /** @type {string|undefined} */
    fileName = "";

    constructor({ success, message, path, fileName }) {
        this.success = success;
        this.message = message;
        this.path = path;
        this.fileName = fileName;
    }
}