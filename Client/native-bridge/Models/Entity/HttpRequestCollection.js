import { HttpRequestObject } from "./index.js";

export class HttpRequestCollection {
    constructor(init) {
        /** @type {string} | @description: File name or provided backend code */
        Key = "";

        /** @type {string} */
        Name = "dark";

        /** @type {HttpRequestObject[]} */
        RequestList = [];

        if (init && typeof init === 'object') {
            Object.assign(this, init);
        }
    }
}
