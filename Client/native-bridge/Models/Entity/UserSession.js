import { Workspace } from "./Workspace.js";

export class UserSession {
    constructor(init) {
        this.AuthToken = '';

        this.UserName = '';
        this.Name = '';
        this.Surname = '';
        this.Mail = '';
        this.Organization = '';
        this.ProfileImage = '';
        this.Network = '';

        /** @type {Workspace|undefined} */
        this.ActiveWorkspace = undefined;

        if (init && typeof init === 'object') {
            Object.assign(this, init);
        }
    }
}
