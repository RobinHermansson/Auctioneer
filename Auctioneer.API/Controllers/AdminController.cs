using Auctioneer.API.Extensions;
using Auctioneer.Application.DTOs;
using Auctioneer.Application.Interfaces;
using Auctioneer.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auctioneer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly UserService _userService;
    public AdminController(UserService userService)
    {
        _userService = userService;    
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserDto?>>> GetAllUsers()
    {

        return Ok(await _userService.GetAllUsersAsync());
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPatch("users/{userId}/active")]
    public async Task<ActionResult> SetUserActiveStatus(int userId, [FromBody] SetUserActiveDto dto)
    {
        var result = await _userService.SetUserActiveStatusAsync(userId, dto);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}
