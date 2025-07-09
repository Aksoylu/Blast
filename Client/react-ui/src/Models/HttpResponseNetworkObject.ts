export class HttpResponseNetworkObject {
    public HttpVersion: string;
    public LocalAddress: string;
    public RemoteAddress: string;

    constructor(init?: Partial<HttpResponseNetworkObject>) {
        Object.assign(this, init);
    }
}