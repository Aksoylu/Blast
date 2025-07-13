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

        if (init && typeof init === 'object') {
            Object.assign(this, init);
        }
    }
}
