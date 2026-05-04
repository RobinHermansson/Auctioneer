using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Auctioneer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly LoginService _loginService;

    public LoginController(LoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> AttemptLogin(LoginRequestDto loginRequest)
    {
        
        var result = await _loginService.Login(loginRequest);
        if (result.Success)
        {
            return Ok(result);
        }
        return Unauthorized(result);

    }
}
