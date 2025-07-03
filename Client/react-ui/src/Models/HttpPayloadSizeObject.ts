// todo: will be detailed soon
export class HttpPayloadSizeObject {
    Total: number; // as ms

    constructor(init?: Partial<HttpPayloadSizeObject>) {
        Object.assign(this, init);
    }
}