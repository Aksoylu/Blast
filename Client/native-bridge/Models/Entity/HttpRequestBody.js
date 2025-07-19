import { HttpRequestBodyTypesEnum, SupportedDataFormatsEnum } from ".././../Enums/index.js";

export class HttpRequestBody {
    /** @type {HttpRequestBodyTypesEnum} */
    type = undefined;

    /** @type {SupportedDataFormatsEnum | undefined} */
    rawDataType = undefined;

    /** @type {any} */
    data = undefined;

    constructor({ type, rawDataType, data }) {
        this.type = type;
        this.rawDataType = rawDataType;
        this.data = data;
    }
}
