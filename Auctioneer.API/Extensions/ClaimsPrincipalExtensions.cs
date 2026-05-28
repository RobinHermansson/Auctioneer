using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Auctioneer.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int? GetUserId(this ClaimsPrincipal user)
    {
        var claim = user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        return int.TryParse(claim, out var userId) ? userId : null;
    }
    public static bool IsAdminCheck(this ClaimsPrincipal user)
    {
        var isAdmin = user.FindFirst(ClaimTypes.Role)?.Value == "Admin";
        return isAdmin;
    }

}