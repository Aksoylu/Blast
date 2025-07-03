import { JSX } from "react";

export class HttpResponseStatusObject {
    Code: string;
    Status: string;
    DisplayBackgroundColor: string;
    DisplayForegroundColor: string;
    Description: string;
    public Icon: React.ComponentType;

    constructor(init?: Partial<HttpResponseStatusObject>) {
        Object.assign(this, init);
    }
}