import { HttpRequestBodyTypesEnum } from "#/Enums";
import { HttpRequestBodyType } from "#/Models";

export class HttpRequestBodyTypeData {
    static items: HttpRequestBodyType[] = [
        {
            type: HttpRequestBodyTypesEnum.NONE,
            code: "NONE"
        },
        {
            type: HttpRequestBodyTypesEnum.FORMDATA,
            code: "FORMDATA"
        },
        {
            type: HttpRequestBodyTypesEnum.URLENCODED,
            code: "URLENCODED"
        },
        {
            type: HttpRequestBodyTypesEnum.RAW,
            code: "RAW"
        },
        {
            type: HttpRequestBodyTypesEnum.BINARY,
            code: "BINARY"
        }
    ];

    public static List(): HttpRequestBodyType[] {
        return HttpRequestBodyTypeData.items;
    }
}