namespace Domain.Entities;

public class Auction
{
    public int AuctionId { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; }
    public bool IsOpen => EndDate > DateTime.UtcNow && IsActive;
    public string Description { get; set; }
    public required int OwnerId { get; set; }
    public User Owner { get; set; }
    public int AuctionItemId { get; set; }
    public AuctionItem AuctionItem { get; set; }
    public decimal StartingPrice { get; set; }
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
