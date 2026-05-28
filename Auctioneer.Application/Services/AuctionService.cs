using Auctioneer.Application.DTOs;
using Auctioneer.Application.DTOs.Mapper;
using Auctioneer.Application.Interfaces;
using Auctioneer.Application.Models;
using Domain.Entities;

namespace Auctioneer.Application.Services;

public class AuctionService
{
    private readonly IAuctionRepository _repo;
    private readonly IUserRepository _userRepository;
    private readonly IBidRepository _bidRepository;
    private readonly IFileService _fileService;

    public AuctionService(IAuctionRepository repo, IUserRepository userRepository, IBidRepository bidRepository, IFileService fileService)
    {
        _repo = repo;
        _userRepository = userRepository;
        _bidRepository = bidRepository;
        _fileService = fileService;
    }

    public async Task<IEnumerable<AuctionDto>> GetAllAuctionsAsync()
    {
        var auctions = await _repo.GetAllAuctionsAsync();
        return auctions.Select(a => DtoMapper.AuctionToDto(a));  
    }
    
    public async Task<IEnumerable<AuctionDto>> GetOpenAuctionsAsync()
    {
        var auctions = await _repo.GetAllAuctionsAsync();
        return auctions
            .Where(a => a.IsOpen)
            .Select(a => DtoMapper.AuctionToDto(a));
    }
    public async Task<IEnumerable<AuctionDto?>> GetAllAuctionsForUserAsync(int userId)
    {
        var auctions = await _repo.GetAllAuctionsForUserIdAsync(userId);
        if (auctions != null)
        {
            return auctions.Select(a => DtoMapper.AuctionToDto(a));
        }
        return new List<AuctionDto>();
    }
    public async Task<AuctionDto?> GetAuctionByIdAsync(int id)
    {
        var auction = await _repo.GetAuctionByIdAsync(id);
        if (auction != null)
        {
            return DtoMapper.AuctionToDto(auction);
        }
        return new AuctionDto();
    }
     
    public async Task<decimal?> GetHighestBidByAuctionId(int auctionId)
    {
         var auction = await _repo.GetAuctionByIdAsync(auctionId);
        if (auction != null)
        { 
            var highestBid = await _bidRepository.GetCurrentHighestBidAmountAsync(auction.AuctionId);
            return highestBid;
        }
        return 0;

    }

    public async Task<GenericResponseDto> AddBidAsync(AddBidDto bid, int userId)
    {
        var auction = await _repo.GetAuctionByIdAsync(bid.AuctionId);
        if (auction != null)
        {
            if (auction.Owner.UserId == userId)
            {
                return new GenericResponseDto() { Message = "The owner of the Auction can not bid.", Success = false };
            }

            var highestBid = await _bidRepository.GetCurrentHighestBidAmountAsync(bid.AuctionId);
            if (highestBid >= bid.Amount) { 
                return new GenericResponseDto() { Message = $"Bid was not higher than the highest bid: {highestBid}" , Success = false };
            }

            var bidderUser = await _userRepository.GetByIdAsync(userId);
            if (bidderUser == null)
            {
                return new GenericResponseDto() { Message = "The user does not exist." , Success = false };
            }

            try
            {

                var newBid = new Bid() { Amount = bid.Amount, AuctionId = bid.AuctionId, BidderUserId = bidderUser.UserId, Timestamp = DateTime.UtcNow };

                auction.Bids.Add(newBid);
                await _repo.UpdateAuctionAsync(auction);


                return new GenericResponseDto() { Message = "Bid successful!" , Success = true };
            }
            catch (Exception ex)
            {
                return new GenericResponseDto() { Message = $"Failed to add bid: {ex.Message}", Success = false };
            }
            

        }
        return new GenericResponseDto() { Message = $"No auction with that Id: {bid.AuctionId} ", Success = false };
    } 

    public async Task<AuctionDto> CreateAuctionAsync(CreateAuctionDto dto, FileUpload? image, int userId)
    {
        string? imageUrl = null;

        if (image != null)
            imageUrl = await _fileService.SaveFileAsync(image, "auctions");
        var auctionItem = new AuctionItem()
        {
            AuctionType = dto.AuctionType,
            Name = dto.Title,
            Description = dto.Description,
            Price = dto.StartingPrice,
            ImageUrl = imageUrl ?? "/images/auctions/placeholder.jpg",

        };

        var auction = new Auction(dto.StartDate, dto.EndDate)
        {
            Name = dto.Title,
            Description = dto.Description,
            OwnerId = userId,
            StartingPrice = dto.StartingPrice,
            AuctionItem = auctionItem,
            IsActive = true

        };
        await _repo.AddAuctionAsync(auction);
        var createdAuction = await _repo.GetAuctionByIdAsync(auction.AuctionId);

        return DtoMapper.AuctionToDto(createdAuction);

    } 

    public async Task<GenericResponseDto> DeleteAuctionAsync(int auctionId, int userId)
    {
        var foundAuction = await _repo.GetAuctionByIdAsync(auctionId);
        if (foundAuction is null)
            return new GenericResponseDto() { Success =  false , Message=$"Could not find an auction with the Id: {auctionId}"};
        if (foundAuction.OwnerId != userId)
            return new GenericResponseDto() { Success = false, Message = $"Only the owner of the auction can delete it." };
        await _repo.DeleteAuctionAsync(foundAuction);
        return new GenericResponseDto() { Success = true, Message = $"Deleted auction with id: {auctionId}" };


    }

    public async Task<IEnumerable<BidFlatDto?>> GetAllBidsForAuctionIdAsync(int id)
    {
        var auction = await _repo.GetAuctionByIdAsync(id);
        if (auction is null)
            return null;
        var dto = auction.Bids.Select(bid => new BidFlatDto() { Amount= bid.Amount, AuctionId = bid.AuctionId, BidderId=bid.Bidder.UserId, BidId = bid.BidId, Timestamp=bid.Timestamp});
        return dto;
    }
    public async Task<GenericResponseDto> RetractBidAsync(int bidId, int userId)
    {
        var bid = await _bidRepository.GetByIdAsync(bidId);
        if (bid == null)
            return new GenericResponseDto { Success = false, Message = "Bid not found." };

        if (bid.BidderUserId != userId)
            return new GenericResponseDto { Success = false, Message = "You can only retract your own bids." };

        var auction = await _repo.GetAuctionByIdAsync(bid.AuctionId);
        if (auction == null)
            return new GenericResponseDto { Success = false, Message = "Auction not found." };

        if (auction.EndDate <= DateTime.UtcNow)
            return new GenericResponseDto { Success = false, Message = "Cannot retract a bid on a closed auction." };

        var latestBid = await _bidRepository.GetLatestBidForAuctionAsync(bid.AuctionId);
        if (latestBid?.BidId != bidId)
            return new GenericResponseDto { Success = false, Message = "You can only retract the latest bid." }; 

        await _bidRepository.DeleteByIdAsync(bidId);
        return new GenericResponseDto { Success = true, Message = "Bid retracted successfully." };
    }

    public async Task<GenericResponseDto> DeactivateAuctionByIdAsync(int auctionId)
    {
        var auction = await _repo.GetAuctionByIdAsync(auctionId);
        if (auction is null) return new GenericResponseDto() { Success = false, Message="Could not find the auction to delete."};
        await _repo.DeactivateAuctionByIdAsync(auction.AuctionId);
        return new GenericResponseDto() { Success = true, Message = "Deactivated the auction successfully"};
    }
    public async Task<GenericResponseDto> UpdateAnAuction(int auctionId, UpdateAuctionDto dto, FileUpload? image, int userId)
    {
        var foundAuction = await _repo.GetAuctionByIdAsync(auctionId);
        if (foundAuction is null) return new GenericResponseDto() { Success=false, Message=$"No Auction found with the Id: {auctionId}"};
        var foundUser = await _userRepository.GetByIdAsync(userId);
        if (foundUser is null) return new GenericResponseDto() { Success=false, Message=$"No User found with the Id: {userId}"};

        if (userId != foundAuction.OwnerId && foundUser.UserRole.Name != "Admin")
            return new GenericResponseDto { Success = false, Message = "You are not the owner of this auction nor an Admin." };

        foundAuction.Name = dto.Title;
        foundAuction.Description = dto.Description;
        foundAuction.StartingPrice = dto.StartingPrice;

        if (foundAuction.AuctionItem != null)
        {
            foundAuction.AuctionItem.Name = dto.ItemName;
            foundAuction.AuctionItem.AuctionType = dto.AuctionType;
            foundAuction.AuctionItem.Price = dto.StartingPrice;

            if (image != null)
            {
                Console.WriteLine("There is an image.");
                var imageUrl = await _fileService.SaveFileAsync(image, "auctions");
                foundAuction.AuctionItem.ImageUrl = imageUrl;
            }
        }

        await _repo.UpdateAuctionAsync(foundAuction);
        return new GenericResponseDto { Success = true, Message = "Updated successfully." };
    }
    public async Task<IEnumerable<AuctionDto>> SearchAuctionsAsync(string title, bool includeClosed)
    {
        var auctions = await _repo.SearchAuctionsByTitleAsync(title, includeClosed);
        return auctions.Select(a => DtoMapper.AuctionToDto(a));
    }    
}
