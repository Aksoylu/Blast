import { HttpResponseBodyTypesEnum } from "#/Enums";
import { HttpResponseBodyType } from "#/Models";
import { BsFiletypeHtml, BsFiletypeJson, BsFiletypeRaw, BsFiletypeXml } from "react-icons/bs";

export class HttpResponseBodyTypeData {
    static items: HttpResponseBodyType[] = [
        new HttpResponseBodyType({
            type: HttpResponseBodyTypesEnum.HTML,
            code: "HTML",
            Icon: BsFiletypeHtml
        }),
        new HttpResponseBodyType({
            type: HttpResponseBodyTypesEnum.JSON,
            code: "JSON",
            Icon: BsFiletypeJson
        }),
        new HttpResponseBodyType({
            type: HttpResponseBodyTypesEnum.XML,
            code: "XML",
            Icon: BsFiletypeXml
        }),
        new HttpResponseBodyType({
            type: HttpResponseBodyTypesEnum.RAW,
            code: "Raw Data",
            Icon: BsFiletypeRaw
        })
    ];

    public static List(): HttpResponseBodyType[] {
        return HttpResponseBodyTypeData.items;
    }

    public static Find(input: HttpResponseBodyTypesEnum | undefined): HttpResponseBodyType | undefined {
        if (input == undefined) {
            return undefined;
        }

        const foundItem = HttpResponseBodyTypeData.items.find((i) => i.type === input);

        return foundItem;
    }
}