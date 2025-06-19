import { HttpQueryParameter } from "./HttpQueryParameter";
import { HttpRequestHeader } from "./HttpRequestHeader";
import { HttpRequestType } from "./HttpRequestType";

export class HttpRequestObject
{
    public RequestType: HttpRequestType;
    public Headers: HttpRequestHeader[];
    public QueryParameters: HttpQueryParameter[];
}