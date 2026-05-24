using Auctioneer.Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Auctioneer.Infrastructure.Repositories;

public class UserRepository: IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }
    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);
    }
    public async Task<bool> AddUserAsync(User user)
    {
        bool success = false;
        try
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            success = true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        return success;
        
    }
}
