import { BaseOperationResult } from "../index.js";
import { UserSession } from "../../Entity/index.js";

export class ReadSessionInfoFromStorageResult extends BaseOperationResult {
    userSession = new UserSession();

    constructor({ success, message, userSession }) {
        super({ success, message });
        this.userSession = userSession;
    }
}