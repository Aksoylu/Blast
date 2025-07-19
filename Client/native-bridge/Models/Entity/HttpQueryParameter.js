export class HttpQueryParameter {
    /** @type {boolean} */
    IsIncluded = false;

    /** @type {string} */
    Key = "";

    /** @type {string} */
    Value = "";

    /** @type {string} */
    Description = "";

    constructor({ IsIncluded, Key, Value, Description }) {
        this.IsIncluded = IsIncluded;
        this.Key = Key;
        this.Value = Value;
        this.Description = Description;
    }
}
