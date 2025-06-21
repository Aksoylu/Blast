import { HttpQueryParameter } from "./HttpQueryParameter";
import { HttpRequestHeader } from "./HttpRequestHeader";
import { HttpRequestType } from "./HttpRequestType";
import { HttpRequestBody } from "./HttpRequestBody";

export class HttpRequestObject
{
    public RequestType: HttpRequestType;
    public Headers: HttpRequestHeader[];
    public QueryParameters: HttpQueryParameter[];
    public Body: HttpRequestBody;
}