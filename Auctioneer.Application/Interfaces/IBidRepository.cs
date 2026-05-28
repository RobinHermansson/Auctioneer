using Domain.Entities;
using System.ComponentModel;

namespace Auctioneer.Application.Interfaces;

public interface IBidRepository
{
    Task<decimal?> GetCurrentHighestBidAmountAsync(int auctionId);
    Task<bool> AddBidAsync(Bid bid);
    Task<Bid?> GetByIdAsync(int id);
    Task<Bid?> GetLatestBidForAuctionAsync(int auctionId);
    Task<bool> DeleteByIdAsync(int id);

}
