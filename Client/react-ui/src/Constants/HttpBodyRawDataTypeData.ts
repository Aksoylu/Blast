import { HttpBodyRawDataTypesEnum } from "#/Enums";
import { HttpBodyRawDataType } from "#/Models";

export class HttpBodyRawDataTypeData {
    static items: HttpBodyRawDataType[] = [
        {
            type: HttpBodyRawDataTypesEnum.TEXT,
            code: "TEXT"
        },
        {
            type: HttpBodyRawDataTypesEnum.HTML,
            code: "HTML"
        },
        {
            type: HttpBodyRawDataTypesEnum.JSON,
            code: "JSON"
        },
        {
            type: HttpBodyRawDataTypesEnum.XML,
            code: "XML"
        }
    ];

    public static List(): HttpBodyRawDataType[] {
        return HttpBodyRawDataTypeData.items;
    }
}