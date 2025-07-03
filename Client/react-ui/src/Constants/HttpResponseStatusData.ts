import { FiCheckCircle, FiAlertTriangle, FiInfo, FiAlertCircle, FiList, FiArrowRightCircle, FiArrowRight, FiExternalLink, FiMinusCircle, FiRepeat, FiCornerRightUp, FiClock, FiCoffee, FiFileMinus, FiArchive, FiSlash, FiLock, FiSearch, FiShieldOff, FiZapOff, FiCloudOff, FiServer, FiTool } from "react-icons/fi";
import { MdOutlineChangeCircle, MdOutlinePending, MdRefresh } from "react-icons/md";

import { HttpResponseStatusObject } from "#/Models"

export class HttpResponseStatusData {
    static items: HttpResponseStatusObject[] = [
        // #region 1xx Informational
        new HttpResponseStatusObject({
            Code: "100",
            Status: "Continue",
            DisplayBackgroundColor: "#17a2b8",
            DisplayForegroundColor: "#ffffff",
            Description: "The server has received the request headers, and the client should proceed to send the request body.",
            Icon: FiInfo
        }),
        new HttpResponseStatusObject({
            Code: "101",
            Status: "Switching Protocols",
            DisplayBackgroundColor: "#17a2b8",
            DisplayForegroundColor: "#ffffff",
            Description: "The requester has asked the server to switch protocols.",
            Icon: MdOutlineChangeCircle
        }),
        new HttpResponseStatusObject({
            Code: "102",
            Status: "Processing",
            DisplayBackgroundColor: "#17a2b8",
            DisplayForegroundColor: "#ffffff",
            Description: "The server has received and is processing the request, but no response is available yet.",
            Icon: MdOutlinePending
        }),
        // #region 2xx Success
        new HttpResponseStatusObject({
            Code: "200",
            Status: "OK",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The request has succeeded.",
            Icon: FiCheckCircle
        }),
        new HttpResponseStatusObject({
            Code: "201",
            Status: "Created",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The request has been fulfilled and resulted in a new resource being created.",
            Icon: FiCheckCircle
        }),
        new HttpResponseStatusObject({
            Code: "202",
            Status: "Accepted",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The request has been accepted for processing, but the processing has not been completed.",
            Icon: FiCheckCircle
        }),
        new HttpResponseStatusObject({
            Code: "203",
            Status: "Non-Authoritative Information",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The returned meta-information is not the definitive set from the origin server.",
            Icon: FiInfo
        }),
        new HttpResponseStatusObject({
            Code: "204",
            Status: "No Content",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The server successfully processed the request and is not returning any content.",
            Icon: FiCheckCircle
        }),
        new HttpResponseStatusObject({
            Code: "205",
            Status: "Reset Content",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The server successfully processed the request, asks that the requester reset its document view.",
            Icon: MdRefresh
        }),
        new HttpResponseStatusObject({
            Code: "206",
            Status: "Partial Content",
            DisplayBackgroundColor: "#28a745",
            DisplayForegroundColor: "#ffffff",
            Description: "The server is delivering only part of the resource due to a range header sent by the client.",
            Icon: FiInfo
        }),
        // #region 3xx Redirection
        new HttpResponseStatusObject({
            Code: "300",
            Status: "Multiple Choices",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "There are multiple options for the resource that the client may follow.",
            Icon: FiList
        }),
        new HttpResponseStatusObject({
            Code: "301",
            Status: "Moved Permanently",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "This resource has been moved permanently to a new URL.",
            Icon: FiArrowRightCircle
        }),
        new HttpResponseStatusObject({
            Code: "302",
            Status: "Found",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "The requested resource resides temporarily under a different URI.",
            Icon: FiArrowRight
        }),
        new HttpResponseStatusObject({
            Code: "303",
            Status: "See Other",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "The response to the request can be found under another URI using a GET method.",
            Icon: FiExternalLink
        }),
        new HttpResponseStatusObject({
            Code: "304",
            Status: "Not Modified",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "The resource has not been modified since the last request.",
            Icon: FiMinusCircle
        }),
        new HttpResponseStatusObject({
            Code: "307",
            Status: "Temporary Redirect",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "The request should be repeated with another URI; future requests should still use the original URI.",
            Icon: FiRepeat
        }),
        new HttpResponseStatusObject({
            Code: "308",
            Status: "Permanent Redirect",
            DisplayBackgroundColor: "#ffc107",
            DisplayForegroundColor: "#000000",
            Description: "The request and all future requests should be repeated using another URI.",
            Icon: FiCornerRightUp
        }),
        // #region 4xx Client Error
        new HttpResponseStatusObject({
            Code: "400",
            Status: "Bad Request",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The server could not understand the request due to invalid syntax.",
            Icon: FiAlertTriangle
        }),
        new HttpResponseStatusObject({
            Code: "401",
            Status: "Unauthorized",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The client must authenticate itself to get the requested response.",
            Icon: FiLock
        }),
        new HttpResponseStatusObject({
            Code: "403",
            Status: "Forbidden",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The client does not have access rights to the content.",
            Icon: FiShieldOff
        }),
        new HttpResponseStatusObject({
            Code: "404",
            Status: "Not Found",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The server can not find the requested resource.",
            Icon: FiSearch
        }),
        new HttpResponseStatusObject({
            Code: "405",
            Status: "Method Not Allowed",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The method is not allowed for the requested URL.",
            Icon: FiSlash
        }),
        new HttpResponseStatusObject({
            Code: "409",
            Status: "Conflict",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The request could not be completed due to a conflict with the current state of the target resource.",
            Icon: FiAlertCircle
        }),
        new HttpResponseStatusObject({
            Code: "410",
            Status: "Gone",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The requested resource is no longer available and will not be available again.",
            Icon: FiArchive
        }),
        new HttpResponseStatusObject({
            Code: "415",
            Status: "Unsupported Media Type",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The request entity has a media type which the server or resource does not support.",
            Icon: FiFileMinus
        }),
        new HttpResponseStatusObject({
            Code: "418",
            Status: "I'm a teapot",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "This code was defined in 1998 as an April Fools' joke. Not actually used.",
            Icon: FiCoffee
        }),
        new HttpResponseStatusObject({
            Code: "429",
            Status: "Too Many Requests",
            DisplayBackgroundColor: "#dc3545",
            DisplayForegroundColor: "#ffffff",
            Description: "The user has sent too many requests in a given amount of time.",
            Icon: FiClock
        }),
        // #region 5xx Server Error
        new HttpResponseStatusObject({
            Code: "500",
            Status: "Internal Server Error",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The server has encountered a situation it doesn't know how to handle.",
            Icon: FiServer
        }),
        new HttpResponseStatusObject({
            Code: "501",
            Status: "Not Implemented",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The request method is not supported by the server and cannot be handled.",
            Icon: FiTool
        }),
        new HttpResponseStatusObject({
            Code: "502",
            Status: "Bad Gateway",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The server received an invalid response from the upstream server.",
            Icon: FiRepeat
        }),
        new HttpResponseStatusObject({
            Code: "503",
            Status: "Service Unavailable",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The server is not ready to handle the request.",
            Icon: FiCloudOff
        }),
        new HttpResponseStatusObject({
            Code: "504",
            Status: "Gateway Timeout",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The server did not receive a timely response from the upstream server.",
            Icon: FiClock
        }),
        new HttpResponseStatusObject({
            Code: "505",
            Status: "HTTP Version Not Supported",
            DisplayBackgroundColor: "#b02a37",
            DisplayForegroundColor: "#ffffff",
            Description: "The HTTP version used in the request is not supported by the server.",
            Icon: FiZapOff
        })
    ];

    public static List(): HttpResponseStatusObject[] {
        return HttpResponseStatusData.items;
    }

    public static FindByCode(code: string | undefined): HttpResponseStatusObject | undefined {
        if (code == undefined) {
            return undefined;
        }

        return HttpResponseStatusData.items.find(item => item.Code == code);
    }
}