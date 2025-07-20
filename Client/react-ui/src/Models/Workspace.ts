export class Workspace {
    Id: string;
    Name: string;
    Storage: "locale" | "remote";

    constructor(init?: Partial<Workspace>) {
        Object.assign(this, init);
    }
}