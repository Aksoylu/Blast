import { Workspace } from "#/Models/Workspace";

export interface GetLocaleWorkspaceListResult {
    success: boolean;
    workspaceList: Workspace[];
    message?: string;
}
