export class UserSession {
    AuthToken: string;

    UserName: string;
    Mail: string;
    Organization: string;
    ProfileImage: string;
    Network: string;

    constructor(init?: Partial<UserSession>) {
        Object.assign(this, init);
    }
}