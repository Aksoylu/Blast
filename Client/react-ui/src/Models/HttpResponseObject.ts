import { HttpResponseHeader } from "./HttpResponseHeader";
import { HttpResponseBodyType } from "./HttpResponseBodyType";
import { HttpResponseNetworkObject } from "./HttpResponseNetworkObject";
import { HttpResponseStatusObject } from "./HttpResponseStatusObject";
import { HttpResponseTimeObject } from "./HttpResponseTimeObject";

export class HttpResponseObject {
    public Headers: HttpResponseHeader[];
    public NetworkInfo: HttpResponseNetworkObject;
    public Status: HttpResponseStatusObject;
    public ResponseTime: HttpResponseTimeObject;
    public BodyType: HttpResponseBodyType;
}
