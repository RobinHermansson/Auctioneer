using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IAuctionRepository
{

    Task<IEnumerable<Auction>> GetAllAuctionsAsync();
    Task<IEnumerable<Auction?>> GetAllAuctionsForUserIdAsync(int id);
    Task<Auction?> GetAuctionByIdAsync(int id);
    Task UpdateAuctionAsync(Auction auction);
    Task AddAuctionAsync(Auction auction);
    Task DeleteAuctionAsync(Auction auction);
    Task DeactivateAuctionByIdAsync(int id);
    Task<IEnumerable<Auction>> SearchAuctionsByTitleAsync(string title, bool includeClosed);

}
