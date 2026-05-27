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
                Email = "r",
                Password = "1",
                UserRoleId = adminRole.UserRoleId
            };

            var userRole = await context.UserRoles.FirstAsync(r => r.Name == "User");
            var user2 = new User
            {
                FirstName = "Mikael",
                LastName = "Tobiasson",
                Email = "m",
                UserRoleId = userRole.UserRoleId,
                Password = "1",
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
            var item3 = new AuctionItem
            {
                Name = "Fast car",
                AuctionType = "Vehicle",
                Price = 9000.00m,
                Description = "The fastest car there is, and its blue!",
                ImageUrl = "/images/auctions/4e07ea4b-3d46-41d1-a9e0-d29c0aef377e.jpg"
            };

            var item4 = new AuctionItem
            {
                Name = "Fine clothing",
                AuctionType = "Clothing",
                Price = 299.00m,
                Description = "High threadcount, what the kids crave.",
                ImageUrl = "/images/auctions/f224ce0a-167a-44b7-a85b-d45688d94b56.jpg"
            };
            var item5 = new AuctionItem
            {
                Name = "T-shirt",
                AuctionType = "Clothing",
                Price = 90.00m,
                Description = "A generic T-shirt. I believe you might have seen this somewhere around town.",
                ImageUrl = "/images/auctions/dfa4c691-2d76-4ea6-aa80-56e3a0f15246.jpg"
            };

            var item6 = new AuctionItem
            {
                Name = "Pair of shoes",
                AuctionType = "Cloth",
                Price = 500.00m,
                Description = "Very nice pair of shoes, you should buy them.",
                ImageUrl = "/images/auctions/3fcd04f1-9cc4-4d62-87dc-76bdc11bc7e3.jpg"
            };

            context.AuctionItems.AddRange(item, item2, item3, item4, item5, item6);
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
            var auction3 = new Auction(
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(18))
                {
                    Name = "Fast car",    
                    Description = "The fastest car there is, and its blue!",    
                    StartingPrice = 9000.00m,
                    IsActive = true,
                    OwnerId = users[1].UserId,
                    AuctionItemId = items[2].AuctionItemId
                };
            var auction4 = new Auction(
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(24))
                {
                    Name = "Fine clothing",
                    Description = "High threadcount, what the kids crave.",    
                    StartingPrice = 500.00m,
                    IsActive = true,
                    OwnerId = users[1].UserId,
                    AuctionItemId = items[3].AuctionItemId
                };
            var auction5 = new Auction(
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(29))
                {
                    Name = "T-Shirt",
                    Description = "A generic T-shirt. I believe you might have seen this somewhere around town.",
                    StartingPrice = 299.00m,
                    IsActive = true,
                    OwnerId = users[0].UserId,
                    AuctionItemId = items[4].AuctionItemId
                };
            var auction6 = new Auction(
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(30))
                {
                    Name = "Pair of shoes",
                    Description = "Very nice pair of shoes, you should buy them.",
                    StartingPrice = 500.00m,
                    IsActive = true,
                    OwnerId = users[1].UserId,
                    AuctionItemId = items[5].AuctionItemId
                };

            context.Auctions.AddRange(auction1, auction2, auction3, auction4, auction5, auction6);
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
                BidderUserId = users[0].UserId,
                Timestamp = DateTime.UtcNow.AddDays(1),
            };

            var bid2 = new Bid
            {
                Amount = 700,
                AuctionId = auctions[1].AuctionId,
                BidderUserId = users[1].UserId,
                Timestamp = DateTime.UtcNow.AddDays(2),
            };

            context.Bids.AddRange(bid1, bid2);
            await context.SaveChangesAsync();
        }
    }
}

