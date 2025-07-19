import { BaseOperationResult } from "./Base";
import { HttpRequestCollection } from "#/Models/";

export interface ReadLocaleCollectionResult extends BaseOperationResult {
    Collection: HttpRequestCollection;
};

export interface GetLocaleCollectionListResult extends BaseOperationResult {
    CollectionList: HttpRequestCollection[];
}