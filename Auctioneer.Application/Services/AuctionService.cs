using Auctioneer.Application.Interfaces;
using Domain.Entities;

namespace Auctioneer.Application.Services;

public class AuctionService
{
    private readonly IAuctionRepository _repo;

    public async Task<IEnumerable<Auction>> GetAllAuctionsAsync()
    {
        return await _repo.GetAllAuctionsAsync();
    }
}
