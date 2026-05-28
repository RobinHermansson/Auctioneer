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

    public async Task<List<UserFullFlatDto?>> GetAllUsersAsync()
    {
        var users = await _userRepo.GetAllUsersAsync();
        return [.. users.Select(u => new UserFullFlatDto() 
        { UserId = u.UserId, 
            FirstName = u.FirstName, 
            LastName = u.LastName, 
            Email = u.Email, 
            IsAdmin = u.UserRoleId == 3, 
            IsActive = u.IsActive 
        })];


    }
    public async Task<GenericResponseDto> CreateUserAsync(RegisterUserRequestDto userdto)
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
            return new GenericResponseDto() { Success = true, Message = "Successfully created a user!"};
        }
        else
        {
            return new GenericResponseDto() { Success = false, Message = "Was not able to create a user!"};
        }

    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var user = await _userRepo.GetByIdAsync(id);
        if (user == null)
            return null;
        return new UserDto()
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email
        };
    }

    public async Task<bool> UpdateUserAsync(int initiatingUserInt, UpdateUserDto updatedUser)
    {

        var foundUser = await _userRepo.GetByIdAsync(initiatingUserInt);
        if (foundUser == null)
            return false;
        if (updatedUser.FirstName != null) foundUser.FirstName = updatedUser.FirstName;
        if (updatedUser.LastName != null) foundUser.LastName = updatedUser.LastName;
        if (updatedUser.Password != null && updatedUser.Password != foundUser.Password) foundUser.Password = updatedUser.Password;

        await _userRepo.UpdateUserAsync(foundUser);
        return true;
    }

}
