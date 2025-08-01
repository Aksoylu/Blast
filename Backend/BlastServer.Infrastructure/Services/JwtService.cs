using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Configuration;

namespace BlastServer.Infrastructure.Services;

public class JwtService: IJwtService
{
    private readonly string secretKey;
    private readonly string issuer;
    private readonly string audience;
    private readonly int expiryMinutes;

    public JwtService(IOptions<JwtSettings> jwtOptions)
    {
        var jwtSettings = jwtOptions.Value;

        this.secretKey = jwtSettings.SecretKey;
        this.issuer = jwtSettings.Issuer;
        this.audience = jwtSettings.Audience;
        this.expiryMinutes = jwtSettings.ExpiryMinutes;
    }

    public string GenerateToken(string? username, IEnumerable<Claim>? additionalClaims = null)
    {
        if(String.IsNullOrEmpty(username)) { 
            throw new SecurityTokenArgumentException("Username cannot null");
        }

        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.secretKey));
        SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        List<Claim> claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };


        if (additionalClaims != null)
        {
            claims.AddRange(additionalClaims);
        }

        var token = new JwtSecurityToken(
            issuer: this.issuer,
            audience: this.audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(this.expiryMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}