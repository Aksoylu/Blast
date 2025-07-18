export class RequestCollection {
    constructor(init) {
        this.Name = '';
        /**  */
        this.RequestList = [];
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
