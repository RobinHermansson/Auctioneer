using Auctioneer.Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Auctioneer.Infrastructure.Repositories;

public class BidRepository : IBidRepository
{
    private readonly ApplicationDbContext _context;

    public BidRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AddBidAsync(Bid bid)
    {
        _context.Bids.Add(bid);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<decimal?> GetCurrentHighestBidAmountAsync(int auctionId)
    {
        // Use an aggregate function (Max()) on the Bids DbSet
        return await _context.Bids
            .Where(b => b.AuctionId == auctionId)
            .Select(b => (decimal?)b.Amount) // Select only the amount column
            .MaxAsync() ?? 0m;          // Execute the MAX aggregation query to the database
    }
}
