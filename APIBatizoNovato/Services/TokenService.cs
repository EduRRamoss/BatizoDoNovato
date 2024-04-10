using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using APIBatizoNovato.Entities;
using Microsoft.IdentityModel.Tokens;

namespace APIBatizoNovato.Services;

public class TokenService
{

    public string GenerateToken()
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key.Secret)), SecurityAlgorithms.HmacSha256Signature
            ),
            Expires = DateTime.Now.AddHours(8)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }



    /*
    public static object GenerateToken(Login login)
    {
        var key = Encoding.ASCII.GetBytes(Key.Secret);
        var tokenConfig = new SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
            {
                new Claim("loginId", login.Id.ToString()),
            }),
            Expires = DateTime.UtcNow.AddHours(5),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenConfig);
        var tokenString = tokenHandler.WriteToken(token);

        return new
        {
            token = tokenString
        }
    }
    */
}
