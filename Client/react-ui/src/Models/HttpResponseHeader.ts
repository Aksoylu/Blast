export class HttpResponseHeader {
    public Key: string;
    public Value: string;

    constructor(init?: Partial<HttpResponseHeader>) {
        Object.assign(this, init);
    }
}