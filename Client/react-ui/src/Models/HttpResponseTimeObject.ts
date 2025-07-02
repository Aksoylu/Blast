// todo: will be detailed soon
export class HttpResponseTimeObject {
    Total: number; // as ms

    constructor(init?: Partial<HttpResponseTimeObject>) {
        Object.assign(this, init);
    }
}