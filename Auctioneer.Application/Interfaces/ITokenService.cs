using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}
