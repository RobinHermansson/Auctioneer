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
}
