import { HttpRequestCollection } from "../../Entity/index.js";
import { BaseOperationResult } from "../index.js";

export class GetLocaleCollectionListResult extends BaseOperationResult {
    /** @type {HttpRequestCollection[]} */
    CollectionList = []

    constructor({ success, message, CollectionList }) {
        super({ success, message });
        this.CollectionList = CollectionList;
    }
}