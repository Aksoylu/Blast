export class GetSubdirectoriesResult {
    /** @type {boolean} */
    result = false;

    /** @type {string[]} */
    directoryList = [];

    /** @type {string|undefined} */
    message = "";

    constructor({ result, directoryList, message }) {
        this.result = result;
        this.directoryList = directoryList;
        this.message = message;
    }
}