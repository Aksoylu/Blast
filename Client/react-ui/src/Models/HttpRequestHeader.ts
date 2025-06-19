export class HttpRequestHeader {
    public IsIncluded: boolean;
    public IsHardcoded: boolean; // Tells that is this parameter set by blast and not able to changable in any circumstances
    public Explanation: string; // If exist, there will be an icon who shows tooltip on hover, tells meaning of header to user
    public Key: string;
    public Value: string;
    public Description: string;
}