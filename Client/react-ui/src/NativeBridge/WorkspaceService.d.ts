import { Workspace } from "#/Models/Workspace";
import { BaseOperationResult } from "./Base";

export interface GetWorkspacePathResult extends BaseOperationResult {};

export interface GetLocaleWorkspaceListResult extends BaseOperationResult {
    workspaceList: Workspace[];
}

export interface CreateLocaleWorkspaceResult extends BaseOperationResult  {}