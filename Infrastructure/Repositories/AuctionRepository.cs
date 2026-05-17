using Auctioneer.Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Auctioneer.Infrastructure.Repositories;

public class AuctionRepository : IAuctionRepository
{
    private readonly ApplicationDbContext _context;

    public AuctionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Auction>> GetAllAuctionsAsync()
    {
        return await _context.Auctions.Include(a => a.AuctionItem).Include(a => a.Owner).Include(b => b.Bids).ThenInclude(bi=> bi.Bidder).ToListAsync();
    }

    public async Task<IEnumerable<Auction?>> GetAllAuctionsForUserIdAsync(int id)
    {

        return await _context.Auctions.Where(a => a.OwnerId == id).Include(a => a.AuctionItem).Include(a => a.Owner).Include(b => b.Bids).ThenInclude(bi=>bi.Bidder).ToListAsync();

    }
    public async Task<Auction?> GetAuctionByIdAsync(int id)
    {
        return await _context.Auctions.Include(a => a.AuctionItem).Include(a => a.Owner).Include(b => b.Bids).ThenInclude(bi=>bi.Bidder).FirstOrDefaultAsync(a => a.AuctionId == id);
    }

    public async Task UpdateAuctionAsync(Auction auction)
    {
        _context.Auctions.Update(auction);
        await _context.SaveChangesAsync();

    }
}
