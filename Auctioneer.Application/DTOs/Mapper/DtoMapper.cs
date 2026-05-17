using Domain.Entities;

namespace Auctioneer.Application.DTOs.Mapper;
public static class DtoMapper
{
    public static AuctionDto AuctionToDto(Auction auction)
    {
        return new AuctionDto
        {
            AuctionId = auction.AuctionId,
            Name = auction.Name,
            Description = auction.Description,
            StartDate = auction.StartDate,
            EndDate = auction.EndDate,
            IsActive = auction.IsActive,
            StartingPrice = auction.StartingPrice,

            Owner = new UserDto
            {
                UserId = auction.Owner.UserId,
                FirstName = auction.Owner.FirstName,
                LastName = auction.Owner.LastName
            },

            Item = new AuctionItemDto
            {
                AuctionItemId = auction.AuctionItem.AuctionItemId,
                Name = auction.AuctionItem.Name,
                AuctionType = auction.AuctionItem.AuctionType,
                ImageUrl = auction.AuctionItem.ImageUrl,
                Description = auction.AuctionItem.Description,
                Price = auction.AuctionItem.Price
            },

            Bids = auction.Bids.Select(b => new BidDto
            {
                BidId = b.BidId,
                Amount = b.Amount,
                AuctionId = b.AuctionId,
                Bidder = new UserDto
                {
                    UserId = b.Bidder.UserId,
                    FirstName = b.Bidder.FirstName,
                    LastName = b.Bidder.LastName
                }
            }).ToList()
        };
    }
}