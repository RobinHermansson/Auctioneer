namespace Auctioneer.Application.DTOs;

public class UserFullFlatDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
    public bool IsActive { get; set; }
}
