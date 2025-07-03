import { SupportedDataFormatsEnum } from "#/Enums";

export class HttpBodyRawData {
    public type: SupportedDataFormatsEnum;
    public Value: string;

    constructor(init?: Partial<HttpBodyRawData>) {
        Object.assign(this, init);
    }
}