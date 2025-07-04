import { SupportedDataFormatsEnum } from "#/Enums";
import { HttpResponseBodyType } from "#/Models";
import { BsFiletypeHtml, BsFiletypeJson, BsFiletypeRaw, BsFiletypeXml } from "react-icons/bs";

export class HttpResponseBodyTypeData {
    static items: HttpResponseBodyType[] = [
        new HttpResponseBodyType({
            type: SupportedDataFormatsEnum.HTML,
            code: "HTML",
            Icon: BsFiletypeHtml
        }),
        new HttpResponseBodyType({
            type: SupportedDataFormatsEnum.JSON,
            code: "JSON",
            Icon: BsFiletypeJson
        }),
        new HttpResponseBodyType({
            type: SupportedDataFormatsEnum.XML,
            code: "XML",
            Icon: BsFiletypeXml
        }),
        new HttpResponseBodyType({
            type: SupportedDataFormatsEnum.RAW,
            code: "Raw Data",
            Icon: BsFiletypeRaw
        })
    ];

    public static List(): HttpResponseBodyType[] {
        return HttpResponseBodyTypeData.items;
    }

    public static Find(input: SupportedDataFormatsEnum | undefined): HttpResponseBodyType | undefined {
        if (input == undefined) {
            return undefined;
        }

        const foundItem = HttpResponseBodyTypeData.items.find((i) => i.type === input);

        return foundItem;
    }
}