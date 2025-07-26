import { HttpQueryParameter } from "./HttpQueryParameter";
import { HttpRequestHeader } from "./HttpRequestHeader";
import { HttpRequestType } from "./HttpRequestType";
import { HttpRequestBody } from "./HttpRequestBody";

export class HttpRequestObject {
    public Id: string;
    public Name: string;
    public readonly EntityType = "http_request";

    public RequestType: HttpRequestType;
    public Headers: HttpRequestHeader[];
    public QueryParameters: HttpQueryParameter[];
    public Body: HttpRequestBody;

    constructor(init?: Partial<HttpRequestObject>) {
        Object.assign(this, init);
    }
}