
export class AppPrefences {
    Theme: "dark"|"light";

    BackendUrl: string;
   

    constructor(init?: Partial<AppPrefences>) {
        Object.assign(this, init);
    }
}