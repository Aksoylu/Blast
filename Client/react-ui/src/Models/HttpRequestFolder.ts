import { HttpRequestObject } from "./HttpRequestObject";

export class HttpRequestFolder {
    public Id: string;
    public Name: string;
    public readonly EntityType = "folder";
    public Items: (HttpRequestObject | HttpRequestFolder)[];
}