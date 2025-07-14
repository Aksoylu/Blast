export class Workspace {
    Name: string;
    Storage: "locale" | "remote";
    code: string;

    constructor(init?: Partial<Workspace>) {
        Object.assign(this, init);
    }
}