export class GetSubdirectoriesResult {
    /** @type {boolean} */
    success = false;

    /** @type {string[]} */
    directoryList = [];

    /** @type {string|undefined} */
    message = "";
    
    constructor({ success, directoryList, message }) {
        this.success = success;
        this.directoryList = directoryList;
        this.message = message;
    }
}