namespace Domain.Entities;

public class UserRole
{
    public int UserRoleId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<User> Users { get; set; }
}
