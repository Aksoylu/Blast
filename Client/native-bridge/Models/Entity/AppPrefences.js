export class AppPrefences {
    theme = "dark";
    BackendUrl = "blast.umitaksoylu.com";

    constructor({ theme, BackendUrl }) {
        this.theme = theme;
        this.BackendUrl = BackendUrl;
    }
}