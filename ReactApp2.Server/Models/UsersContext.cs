using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
    }
}