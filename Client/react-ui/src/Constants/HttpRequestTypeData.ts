import {  HttpRequestTypesEnum } from "#/Enums/HttpRequestTypes";
import { HttpRequestType } from "#/Models/HttpRequestType";

export class HttpRequestTypeData {
    static items: HttpRequestType[] = [
        {
            type: HttpRequestTypesEnum.POST,
            color: "blue",
            code: "POST"
        },
        {
            type: HttpRequestTypesEnum.GET,
            color: "green",
            code: "GET"
        },
        {
            type: HttpRequestTypesEnum.PUT,
            color: "purple",
            code: "PUT"
        },
        {
            type: HttpRequestTypesEnum.DELETE,
            color: "red",
            code: "DELETE"
        },
        {
            type: HttpRequestTypesEnum.HEAD,
            color: "orange",
            code: "HEAD"
        },
        {
            type: HttpRequestTypesEnum.OPTIONS,
            color: "yellow",
            code: "OPTIONS",
        },
        {
            type: HttpRequestTypesEnum.PATCH,
            color: "pink",
            code: "PATCH"
        },
        {
            type: HttpRequestTypesEnum.CUSTOM,
            color: "white",
            code: "CUSTOM"
        }
    ];

    public static GetByType(type: HttpRequestTypesEnum): HttpRequestType {
        const defaultItem = HttpRequestTypeData.items[HttpRequestTypeData.items.length - 1];
        const foundItem = HttpRequestTypeData.items.find((i) => i.type === type);
        return (foundItem ?? defaultItem);
    }

    public static GetColor(type: HttpRequestTypesEnum):string {
        const foundItem = HttpRequestTypeData.items.find((i) => i.type === type);

        return foundItem !== undefined ? foundItem.color : "white";
    }

    public static List(): HttpRequestType[] {
        return HttpRequestTypeData.items;
    }
} 