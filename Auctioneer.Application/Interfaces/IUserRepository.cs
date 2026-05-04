using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
}
