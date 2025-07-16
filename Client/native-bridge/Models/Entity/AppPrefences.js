export class AppPrefences {
    Theme = "dark";
    BackendUrl = "blast.umitaksoylu.com";

    constructor({ Theme, BackendUrl }) {
        this.Theme = Theme;
        this.BackendUrl = BackendUrl;
    }
}