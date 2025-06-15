import { color } from "framer-motion";
import { HttpRequestTypes } from "./Enums/HttpRequestTypes";

export class HttpRequestTypeColors {
    static items = [
        {
            type: HttpRequestTypes.POST,
            color: "blue"
        },
        {
            type: HttpRequestTypes.GET,
            color: "green"
        },
        {
            type: HttpRequestTypes.PUT,
            color: "purple"
        },
        {
            type: HttpRequestTypes.DELETE,
            color: "red"
        },
        {
            type: HttpRequestTypes.HEAD,
            color: "orange"
        },
        {
            type: HttpRequestTypes.PATCH,
            color: "gray"
        },
        {
            type: HttpRequestTypes.OPTIONS,
            color: "yellow"
        },
        {
            type: HttpRequestTypes.CUSTOM,
            color: "white"
        }
    ];

    public static GetColor(type: HttpRequestTypes) {
        const foundItem = HttpRequestTypeColors.items.find((i) => i.type === type);

        return foundItem !== undefined ? foundItem.color : "white";
    }

    public static List() {
        return HttpRequestTypeColors.items;
    }
} 