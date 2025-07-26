import { HttpRequestObject } from "./index.js";

export class HttpRequestFolder {
    /** @type {string} | @description: File name or provided backend code */
    Id = "";

    /** @type {string} */
    Name = "dark";

    /** @type {string} */
    EntityType = "folder"

    /** @type {(HttpRequestObject | HttpRequestFolder) []} */
    Items = [];

    constructor({ Id, Name, Items }) {
        this.Id = Id;
        this.Name = Name;
        this.Items = Items;
    }
}
