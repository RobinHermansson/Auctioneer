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
        return await _context.Auctions.Include(a => a.AuctionItem).Include(a => a.Owner).ToListAsync();
    }
}
