export class Workspace {
    /** @type {string} */
    Name = "dark";

    /** @type {"locale"|"remote"} */
    Storage = "locale";

    /** @type {string} */
    Code = "";

    constructor({ Name, Storage, Code }) {
        this.Name = Name;
        this.Storage = Storage;
        this.Code = Code;
    }
}