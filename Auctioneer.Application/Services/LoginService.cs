using Auctioneer.Application.DTOs;
using Auctioneer.Application.Interfaces;

namespace Auctioneer.Application.Services;

public class LoginService
{
    private readonly IUserRepository _repo;

    public LoginService(IUserRepository repo)
    {
        _repo = repo;
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        var user = await _repo.GetByEmailAsync(loginRequestDto.Email);
        if (user == null)
            return new LoginResponseDto() { Success = false };

        return new LoginResponseDto() { Success = true };
    }
}
