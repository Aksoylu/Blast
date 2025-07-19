import { SupportedDataFormatsEnum, HttpRequestBodyTypesEnum } from "#/Enums";

export class HttpRequestBody {
    public type: HttpRequestBodyTypesEnum;
    public rawDataType?: SupportedDataFormatsEnum;
    public data?: any;
}