using Auctioneer.Application.DTOs;
using Auctioneer.Application.Interfaces;

namespace Auctioneer.Application.Services;

public class LoginService
{
    private readonly IUserRepository _repo;
    private readonly ITokenService _tokenService;

    public LoginService(IUserRepository repo, ITokenService jwtTokenService)
    {
        _repo = repo;
        _tokenService = jwtTokenService;
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        var user = await _repo.GetByEmailAsync(loginRequestDto.Email);
        if (user == null)
            return new LoginResponseDto() { Success = false };
        if (user.Password != loginRequestDto.Password)
        {
            return new LoginResponseDto() { Success = false };
        }
        return new LoginResponseDto() { Success = true, Token=_tokenService.CreateToken(user) };
    }
}
