export class BaseOperationResult {
    /** @type {boolean} */
    success = false;

    /** @type {string|undefined} */
    message = "";

    constructor({ success, message }) {
        this.success = success;
        this.message = message;
    }
}