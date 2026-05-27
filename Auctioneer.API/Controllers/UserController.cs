using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
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
    public async Task<ActionResult<UserDto?>> WhoAmI()
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        var userDto = await _userService.GetUserByIdAsync(userId);

        return Ok(userDto);
    }
    [HttpPost("register")]
    public async Task<ActionResult<GenericResponseDto>> RegisterUser(RegisterUserRequestDto userRegistering)
    {

        Console.WriteLine("Received the user request.");
        return Ok(await _userService.CreateUserAsync(userRegistering));   

    }
    [Authorize]
    [HttpPatch("update")]
    public async Task<ActionResult> UpdateUser(UpdateUserDto updateUser)
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var result = await _userService.UpdateUserAsync(userId, updateUser);
        return Ok(new { Success = true, Message = "Successfully updated user. "});
    }
}
