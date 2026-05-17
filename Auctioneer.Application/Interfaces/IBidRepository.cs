using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IBidRepository
{
    Task<decimal?> GetCurrentHighestBidAmountAsync(int auctionId);
    Task<bool> AddBidAsync(Bid bid);

}
