using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int id);
    Task<bool> AddUserAsync(User user);
    Task<bool> UpdateUserAsync(User user);
}
