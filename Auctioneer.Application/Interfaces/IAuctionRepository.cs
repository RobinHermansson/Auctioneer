using Auctioneer.Application.DTOs;
using Domain.Entities;

namespace Auctioneer.Application.Interfaces;

public interface IAuctionRepository
{

    Task<IEnumerable<Auction>> GetAllAuctionsAsync();
    Task<IEnumerable<Auction?>> GetAllAuctionsForUserIdAsync(int id);
    Task<Auction?> GetAuctionByIdAsync(int id);

}
