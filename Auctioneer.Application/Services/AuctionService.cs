using Auctioneer.Application.DTOs;
using Auctioneer.Application.DTOs.Mapper;
using Auctioneer.Application.Interfaces;

namespace Auctioneer.Application.Services;

public class AuctionService
{
    private readonly IAuctionRepository _repo;

    public AuctionService(IAuctionRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<AuctionDto>> GetAllAuctionsAsync()
    {
        var auctions = await _repo.GetAllAuctionsAsync();
        return auctions.Select(a => DtoMapper.AuctionToDto(a));  
    }
    public async Task<IEnumerable<AuctionDto?>> GetAllAuctionsForUserAsync(UserDto user)
    {
        var auctions = await _repo.GetAllAuctionsForUserIdAsync(user.UserId);
        if (auctions != null)
        {
            return auctions.Select(a => DtoMapper.AuctionToDto(a));
        }
        return new List<AuctionDto>();
    }
}
