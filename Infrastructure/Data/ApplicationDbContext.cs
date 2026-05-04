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
            user.HasData(
                new User() { UserId = 1, FirstName = "Robin", LastName = "Hermansson", Email = "robin.hermansson@iths.se", UserRoleId = 1 },
                new User() { UserId = 2, FirstName = "Mikael", LastName = "Tobiasson", Email = "mikaeltobiasson@hotmail.com", UserRoleId = 2 }
            );

        });
        modelBuilder.Entity<UserRole>(userRole =>
        {
            userRole.HasKey(ur => ur.UserRoleId);
            userRole.HasData(
            new UserRole() { UserRoleId = 1, Name = "Admin", Description = "Administrator role, able to do anything. Possibly fly." },
            new UserRole() { UserRoleId = 2, Name = "User", Description = "Your bogstandard User role. Can do just about anything, but not as much as its better part admin." }
            );
        });
        modelBuilder.Entity<User>()
            .HasOne(u => u.UserRole)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.UserRoleId)
            .IsRequired();

        modelBuilder.Entity<Auction>(auction =>
        {
            auction.HasKey(auction => auction.AuctionId);
        });

        modelBuilder.Entity<Auction>()
            .HasOne(a => a.AuctionItem)
            .WithOne(ai => ai.Auction)
            .HasForeignKey<Auction>(a => a.AuctionItemId);


    }

}
