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
        return await _context.Auctions.Include(a => a.AuctionItem).Include(a => a.Owner).Include(b => b.Bids).ThenInclude(bi=> bi.Bidder).Where(a =>!a.IsDeactivated).ToListAsync();
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
        if (auction.AuctionItem != null)
            _context.Update(auction.AuctionItem);
        await _context.SaveChangesAsync();

    }

    public async Task AddAuctionAsync(Auction auction)
    {
        try {
            _context.Add(auction);
        }
        catch (Exception ex) {
            Console.WriteLine($"Not able to add Auction. {ex.Message}");
        }
        
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAuctionAsync(Auction auction)
    {
        try
        {
            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Not able to delete Auction. {ex.Message}");    
        }
    }

    public async Task DeactivateAuctionByIdAsync(int id) {
        try
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction is null) return;
            auction.IsDeactivated = true;
            _context.Auctions.Update(auction);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Could not deactivate auction. {ex.Message}");
        }
    }
    public async Task<IEnumerable<Auction>> SearchAuctionsByTitleAsync(string title)
    {
        return await _context.Auctions
            .Include(a => a.Owner)
                .ThenInclude(o => o.UserRole)
            .Include(a => a.AuctionItem)
            .Include(a => a.Bids)
                .ThenInclude(b => b.Bidder)
            .Where(a => a.Name.Contains(title))
            .ToListAsync();
    }
}
