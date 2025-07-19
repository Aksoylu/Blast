import { HttpRequestCollection } from "../../Entity/index.js";
import { BaseOperationResult } from "../index.js";

export class ReadLocaleCollectionResult extends BaseOperationResult {
    Collection = new HttpRequestCollection();

    constructor({ success, message, Collection }) {
        super({ success, message });
        this.Collection = Collection;
    }
}