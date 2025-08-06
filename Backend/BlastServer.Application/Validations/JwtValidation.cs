namespace BlastServer.API.Validations
{
    public class JwtValidation
    {
        public static bool Check(string? token)
        {
            if (string.IsNullOrWhiteSpace(token)) return false;

            var parts = token.Split('.');
            if (parts.Length != 3) return false;

            return parts.All(isBase64Url);
        }

        private static bool isBase64Url(string part)
        {
            try
            {
                string padded = part.PadRight(part.Length + (4 - part.Length % 4) % 4, '=');
                Convert.FromBase64String(padded.Replace('-', '+').Replace('_', '/'));
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
