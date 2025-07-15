import { UserSession } from "#/Models/UserSession";

export interface ReadSessionInfoFromStorageResult {
  success: boolean;
  userSession: UserSession;
  message?: string;
}

export interface SaveSessionInfoToStorageResult {
  success: boolean;
  message?: string;
}
