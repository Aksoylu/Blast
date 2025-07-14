export class IsFileExistResult {
    /** @type {boolean} */
    result = false;

    /** @type {string|undefined} */
    message = "";

    constructor({ result, message }) {
        this.result = result;
        this.message = message;
    }
}