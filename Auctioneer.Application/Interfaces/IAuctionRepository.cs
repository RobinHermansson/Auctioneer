using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IAuctionRepository
{

    Task<IEnumerable<Auction>> GetAllAuctionsAsync();

}
