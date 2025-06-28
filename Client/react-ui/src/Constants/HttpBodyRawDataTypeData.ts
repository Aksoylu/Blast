import { SupportedDataFormatsEnum } from "#/Enums";
import { HttpBodyRawDataType } from "#/Models";

export class HttpBodyRawDataTypeData {
    static readonly items: HttpBodyRawDataType[] = [
        {
            type: SupportedDataFormatsEnum.TEXT,
            code: "TEXT"
        },
        {
            type: SupportedDataFormatsEnum.HTML,
            code: "HTML"
        },
        {
            type: SupportedDataFormatsEnum.JSON,
            code: "JSON"
        },
        {
            type: SupportedDataFormatsEnum.XML,
            code: "XML"
        }
    ];

    static readonly monacoLanguageMap = {
        [SupportedDataFormatsEnum.TEXT]: "text",
        [SupportedDataFormatsEnum.HTML]: "html",
        [SupportedDataFormatsEnum.JSON]: "json",
        [SupportedDataFormatsEnum.XML]: "xml"   
    }

    public static List(): HttpBodyRawDataType[] {
        return HttpBodyRawDataTypeData.items;
    }

    public static GetAsMonacoLanguage(type: SupportedDataFormatsEnum | undefined): string {
        if(type === undefined)
        {
            return HttpBodyRawDataTypeData.monacoLanguageMap[SupportedDataFormatsEnum.TEXT];
        }

        return HttpBodyRawDataTypeData.monacoLanguageMap[type];
    }
}
