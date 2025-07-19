import { UserSession } from "#/Models/UserSession";
import { BaseOperationResult } from "./Base";
export interface ReadSessionInfoFromStorageResult extends BaseOperationResult {
  userSession: UserSession;
}

export interface SaveSessionInfoToStorageResult extends BaseOperationResult { }
