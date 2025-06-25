import { HttpBodyFormDataTypesEnum } from "#/Enums";
import { HttpBodyFormDataType } from "#/Models";

export class HttpBodyFormDataTypeData{
    static items: HttpBodyFormDataType[] = [
        {
            type: HttpBodyFormDataTypesEnum.Text,
            code: "TEXT"
        },
        {
            type: HttpBodyFormDataTypesEnum.File,
            code: "FILE"
        },
    ];

    public static List(): HttpBodyFormDataType[] {
        return HttpBodyFormDataTypeData.items;
    }
}