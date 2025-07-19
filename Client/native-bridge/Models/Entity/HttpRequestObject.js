import { HttpRequestType, HttpRequestHeader, HttpQueryParameter, HttpRequestBody } from "./index.js";

export class HttpRequestObject {
    /** @type {HttpRequestType} */
    RequestType = undefined;

    /** @type {HttpRequestHeader[]} */
    Headers = [];

    /** @type {HttpQueryParameter[]} */
    QueryParameters = [];

    /** @type {HttpRequestBody} */
    Body = undefined;

    constructor({ RequestType, Headers, QueryParameters, Body }) {
        this.RequestType = RequestType;
        this.Headers = Headers;
        this.QueryParameters = QueryParameters;
        this.Body = Body;
    }
}
