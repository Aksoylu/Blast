import { Workspace } from "./Workspace";

export class UserSession {
    AuthToken: string;

    UserName: string;
    Name: string;
    Surname: string;
    Mail: string;
    Organization: string;
    ProfileImage: string;
    Network: string;

    ActiveWorkspaceInfo: Workspace | undefined;

    constructor(init?: Partial<UserSession>) {
        Object.assign(this, init);
    }
}