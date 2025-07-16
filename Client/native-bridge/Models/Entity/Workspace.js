export class Workspace {
    /** @type {string} */
    Name = "dark";

    /** @type {"locale"|"remote"} */
    Storage = "locale";

    /** @type {string} | @description: Directory name or provided backend code */
    Key = "";

    constructor({ Name, Storage, Key }) {
        this.Name = Name;
        this.Storage = Storage;
        this.Key = Key;
    }
}