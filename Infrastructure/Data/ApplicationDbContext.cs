using Domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<AuctionItem> AuctionItems { get; set; }
    public DbSet<Bid> Bids { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = new SqlConnectionStringBuilder()
        {
            ServerSPN = "localhost",
            InitialCatalog = "AuctioneerDB",
            TrustServerCertificate = true,
            IntegratedSecurity = true
        }.ToString();
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>(user =>
        {
            user.HasKey(u => u.UserId);

        });
        modelBuilder.Entity<User>()
            .HasOne(u => u.UserRole)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.UserRoleId)
            .IsRequired();
        modelBuilder.Entity<UserRole>(userRole =>
        {
            userRole.HasKey(ur => ur.UserRoleId);
        });

        modelBuilder.Entity<Auction>(auction =>
        {
            auction.HasKey(auction => auction.AuctionId);
                
        });
        modelBuilder.Entity<Auction>()
            .Property(a => a.StartingPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Auction>()
            .HasOne(a => a.AuctionItem)
            .WithOne(ai => ai.Auction)
            .HasForeignKey<Auction>(a => a.AuctionItemId);

        modelBuilder.Entity<Auction>()
            .HasOne(a => a.Owner)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AuctionItem>()
            .Property(a => a.Price)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Bid>()
            .HasOne(b => b.Bidder)
            .WithMany(u => u.Bids)
            .HasForeignKey(b => b.BidderUserId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Bid>()
            .Property(b => b.Amount)
            .HasPrecision(18, 2);
    }

}
