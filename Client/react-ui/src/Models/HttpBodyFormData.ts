import { HttpBodyFormDataTypesEnum } from "#/Enums";

export class HttpBodyFormData {
    public IsIncluded: boolean;
    public DataType: HttpBodyFormDataTypesEnum;
    public Key: string;
    public Value: string;
    public Description: string;
}