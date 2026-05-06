using Auctioneer.Domain.Entities;

namespace Domain.Entities;

public class Auction
{
    public int AuctionId { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public required User Owner { get; set; }
    public int AuctionItemId { get; set; }
    public required AuctionItem AuctionItem { get; set; }
    public List<Bid> Bids { get; set; } = new List<Bid>();

    public Auction(DateTime start, DateTime end)
    {
        if (end <= start)
            throw new ArgumentException("Auction must end after it starts");
        StartDate = start;
        EndDate = end;
    }
    public Auction()
    {

    }
    
}
