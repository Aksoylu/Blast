import { HttpResponseBodyTypes } from "#/Enums";

export class HttpResponseBodyType {
    public type: HttpResponseBodyTypes;
    public code: string;
    public Icon: React.ComponentType;

    constructor(init?: Partial<HttpResponseBodyType>) {
        Object.assign(this, init);
    }
}