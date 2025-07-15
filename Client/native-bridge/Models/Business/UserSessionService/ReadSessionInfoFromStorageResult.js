import { UserSession } from "../../Entity/index.js";

export class ReadSessionInfoFromStorageResult {
    /** @type {boolean} */
    success = false;

    userSession = new UserSession();

    /** @type {string|undefined} */
    message = "";

    constructor({ success, message }) {
        this.success = success;
        this.message = message;
    }
}