import { SupportedDataFormatsEnum } from "#/Enums";

export class HttpResponseBodyType {
    public type: SupportedDataFormatsEnum;
    public code: string;
    public Icon: React.ComponentType;

    constructor(init?: Partial<HttpResponseBodyType>) {
        Object.assign(this, init);
    }
}