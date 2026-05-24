using Auctioneer.Application.DTOs;
using Auctioneer.Application.Interfaces;
using Domain.Entities;

namespace Auctioneer.Application.Services;

public class UserService
{
    private readonly IUserRepository _userRepo;

    public UserService(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<RegisterUserResponseDto> CreateUserAsync(RegisterUserRequestDto userdto)
    {
        var user = new User()
        {
            FirstName = userdto.FirstName,
            LastName = userdto.LastName,
            Email = userdto.Email,
            Password = userdto.Password,
            UserRoleId = 4
        };

        if (await _userRepo.AddUserAsync(user))
        {
            return new RegisterUserResponseDto() { Success = true, Message = "Successfully created a user!"};
        }
        else
        {
            return new RegisterUserResponseDto() { Success = false, Message = "Was not able to create a user!"};
        }

    }
}
