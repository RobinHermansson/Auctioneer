
namespace Domain.Entities;

public class User
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set;  } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int UserRoleId { get; set; }
    public bool IsActive { get; set; }
    public UserRole UserRole { get; set; }
    public ICollection<Bid> Bids { get; set; } = new List<Bid>();

    public User()
    {
    }

}
