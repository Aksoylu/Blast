export class Workspace {
    /** @type {string} */
    Name = "dark";

    /** @type {"locale"|"remote"} */
    Storage = "locale";

    /** @type {string} | @description: Directory name or provided backend code */
    Id = "";

    constructor({ Id, Name, Storage}) {
        this.Id = Id;
        this.Name = Name;
        this.Storage = Storage;
    }
}