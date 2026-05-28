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
   public async Task<Bid?> GetByIdAsync(int id) {
        return await _context.Bids
            .Include(b => b.Bidder)
            .FirstOrDefaultAsync(b => b.BidId == id);
    } 
    public async Task<Bid?> GetLatestBidForAuctionAsync(int auctionId)
    {
        return await _context.Bids
            .Where(b => b.AuctionId == auctionId)
            .OrderByDescending(b => b.Timestamp)
            .FirstOrDefaultAsync();
    }
    public async Task<bool> DeleteByIdAsync(int id) {
        var bid = await _context.Bids.FindAsync(id);
        if (bid == null) return false;
        try
        {
            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex) {
            Console.WriteLine($"Unable to delete bid with id: {bid}.\n{ex.Message}");
            return false;
        }
        return true;
    }
}
