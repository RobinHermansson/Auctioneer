using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Auctioneer.Infrastructure.Data;

public static class DevSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Ensure DB is created & migrations applied
        await context.Database.MigrateAsync();
        

        // -------------------
        // USER ROLES
        // -------------------

        if (!await context.UserRoles.AnyAsync())
        {
            Console.WriteLine("Seeding User Roles...");
            var adminRole = new UserRole { Name = "Admin", Description = "Administrator role with full permissions" };
            var userRole = new UserRole { Name = "User", Description = "Regular user role with limited permissions" };
            context.UserRoles.AddRange(adminRole, userRole);
            await context.SaveChangesAsync();
        }

        // -------------------
        // USERS
        // -------------------
        if (!await context.Users.AnyAsync())
        {
            Console.WriteLine("Seeding Users...");
            var adminRole = await context.UserRoles.FirstAsync(r => r.Name == "Admin");
            var user1 = new User
            {
                FirstName = "Robin",
                LastName = "Hermansson",
                Email = "robin.hermansson@iths.se",
                UserRoleId = adminRole.UserRoleId
            };

            var userRole = await context.UserRoles.FirstAsync(r => r.Name == "User");
            var user2 = new User
            {
                FirstName = "Mikael",
                LastName = "Tobiasson",
                Email = "mikaeltobiasson@hotmail.com",
                UserRoleId = userRole.UserRoleId
            };

            context.Users.AddRange(user1, user2);
            await context.SaveChangesAsync();
        }

        // -------------------
        // AUCTION ITEM 
        // -------------------
        if (!await context.AuctionItems.AnyAsync())
        {

            Console.WriteLine("Seeding Auction Items...");
            var item = new AuctionItem
            {
                Name = "Vintage Clock",
                AuctionType = "Antique",
                Price = 100.00m,
                Description = "A beautiful vintage clock from the 19th century.",
                ImageUrl = "/images/auctions/clock.jpg"
            };

            var item2 = new AuctionItem
            {
                Name = "Gaming PC",
                AuctionType = "Electronics",
                Price = 500.00m,
                Description = "A high-end gaming PC with the latest components.",
                ImageUrl = "/images/auctions/gamingpc.jpg"
            };

            context.AuctionItems.AddRange(item, item2);
            await context.SaveChangesAsync();
        }
        // -------------------
        // AUCTION
        // -------------------
        if (!await context.Auctions.AnyAsync())
        {
            var items = await context.AuctionItems.ToListAsync();
            var users = await context.Users.ToListAsync();
            Console.WriteLine("Seeding Auctions...");
            var auction1 = new Auction()
                {
                    Name = "Vintage Clock",
                    Description = "A beautiful vintage clock from the 19th century.",
                    StartingPrice = 100.00m,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    IsActive = true,
                    OwnerId = users[1].UserId,
                    AuctionItemId = items[0].AuctionItemId
                };
            
            var auction2 = new Auction(
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(7))
                {
                    Name = "Gaming PC",
                    Description = "A high-end gaming PC with the latest components.",
                    StartingPrice = 500.00m,
                    IsActive = true,
                    OwnerId = users[0].UserId,
                    AuctionItemId = items[1].AuctionItemId
                };

            context.Auctions.AddRange(auction1, auction2);
            await context.SaveChangesAsync();

        }


        // -------------------
        // BIDS
        // -------------------
        if (!await context.Bids.AnyAsync())
        {
            var users = await context.Users.ToListAsync();
            var auctions = await context.Auctions.ToListAsync();
            Console.WriteLine("Seeding Bids...");
            var bid1 = new Bid
            {
                Amount = 500,
                AuctionId = auctions[0].AuctionId,
                BidderUserId = users[0].UserId
            };

            var bid2 = new Bid
            {
                Amount = 700,
                AuctionId = auctions[1].AuctionId,
                BidderUserId = users[1].UserId
            };

            context.Bids.AddRange(bid1, bid2);
            await context.SaveChangesAsync();
        }
    }
}

