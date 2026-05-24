using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Auctioneer.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("whoami")]
    public async Task<ActionResult<int?>> WhoAmI()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        return Ok(userId);
    }
    [HttpPost("register")]
    public async Task<ActionResult<RegisterUserResponseDto>> RegisterUser(RegisterUserRequestDto userRegistering)
    {

        Console.WriteLine("Received the user request.");
        return Ok(await _userService.CreateUserAsync(userRegistering));   

    }
}
