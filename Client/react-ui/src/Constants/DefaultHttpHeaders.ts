import { HttpRequestHeader } from "#/Models/HttpRequestHeader";

export class DefaultHttpHeaders {
     static items: HttpRequestHeader[] = [
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "Blast appends a random UUID to every outgoing request for developers so they can have better debug experience",
               Key: "Blast-UUID",
               Value: "[Dynamic]",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "Content-Length header specifies the size of the outgoing request to server. Calculated when request is sent and can not editable",
               Key: "Content-Length",
               Value: "[Dynamic]",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "The User-Agent header is added to help the server identify Blast as the HTTP client",
               Key: "User-Agent",
               Value: "BlastEngine",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "Blast automatically adds accept header to tell the server that Blast is able processing all types of response content",
               Key: "Accept",
               Value: "*/*",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "Blast automatically sets Content-Type header by your choices in 'Body' tab therefore you are not able to change it from here",
               Key: "Content-Type",
               Value: "[Dynamic]",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "Blast automatically sets Content-Type header by your choices in 'Body' tab therefore you are not able to change it manually",
               Key: "Accept-Encoding",
               Value: "gzip, deflate, br",
               Description: ""
          },
          {
               IsIncluded: true,
               IsHardcoded: true,
               Explanation: "For now, Blast is only available for keep-alive http connections. So you cannot edit this header manually",
               Key: "Connection",
               Value: "keep-alive",
               Description: ""
          }
     ];

     public static List(): HttpRequestHeader[] {
          return DefaultHttpHeaders.items;
     }
}