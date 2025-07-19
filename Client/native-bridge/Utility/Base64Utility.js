export class Base64Utility {
    static Base64Encode(text) {
        return Buffer.from(text, 'utf-8').toString('base64');
    }

    static Base64Decode(base64) {
        return Buffer.from(base64, 'base64').toString('utf-8');
    }
}