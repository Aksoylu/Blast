export class HttpRequestHeader {
    /** @type {boolean} */
    IsIncluded = false;

    /**
     * @type {boolean}
     * @description Tells that this parameter is set by Blast and is not changeable in any circumstance
     */
    IsConstant = false;

    /**
     * @type {string}
     * @description If exists, an icon with tooltip will be shown on hover to explain the meaning of the header
     */
    Explanation = "";

    /** @type {string} */
    Key = "";

    /** @type {string} */
    Value = "";

    /** @type {string} */
    Description = "";

    constructor({ IsIncluded, IsConstant, Explanation, Key, Value, Description }) {
        this.IsIncluded = IsIncluded;
        this.IsConstant = IsConstant;
        this.Explanation = Explanation;
        this.Key = Key;
        this.Value = Value;
        this.Description = Description;
    }
}
