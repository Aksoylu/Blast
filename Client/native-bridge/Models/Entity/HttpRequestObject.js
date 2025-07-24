import { HttpRequestType, HttpRequestHeader, HttpQueryParameter, HttpRequestBody } from "./index.js";

export class HttpRequestObject {
    /** @type {string} | @description: File name or provided backend code */
    Id = "";

    /** @type {string} */
    Name = "dark";

    /** @type {string} */
    EntityType = "http_request"

    /** @type {HttpRequestType} */
    RequestType = undefined;

    /** @type {HttpRequestHeader[]} */
    Headers = [];

    /** @type {HttpQueryParameter[]} */
    QueryParameters = [];

    /** @type {HttpRequestBody} */
    Body = undefined;

    constructor({ Id, Name, RequestType, Headers, QueryParameters, Body }) {
        this.Id = Id;
        this.Name = Name;
        this.RequestType = RequestType;
        this.Headers = Headers;
        this.QueryParameters = QueryParameters;
        this.Body = Body;
    }
}
