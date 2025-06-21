import { HttpBodyRawDataTypesEnum, HttpRequestBodyTypesEnum } from "#/Enums";

export class HttpRequestBody {
    public type: HttpRequestBodyTypesEnum;
    public rawDataType?: HttpBodyRawDataTypesEnum;
    public data?: any;
}