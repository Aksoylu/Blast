import { HttpRequestTypesEnum } from "../../Enums/index.js";

export class HttpRequestType {
    /** @type {HttpRequestTypesEnum} */
    type = HttpRequestTypesEnum.GET; 

    /** @type {string} */
    color = "";

    /** @type {string} */
    code = "";

    constructor({ type, color, code }) {
        this.type = type;
        this.color = color;
        this.code = code;
    }
}
