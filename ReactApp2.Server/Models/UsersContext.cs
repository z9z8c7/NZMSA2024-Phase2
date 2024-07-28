using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Users>().ToTable("Userinfo", schema:"dbo");

            modelBuilder.Entity<Users>().Property(u => u.Id).HasColumnName("Id");
            modelBuilder.Entity<Users>().Property(u => u.UserName).HasColumnName("Username");
            modelBuilder.Entity<Users>().Property(u => u.Password).HasColumnName("Password");
            modelBuilder.Entity<Users>().Property(u => u.Email).HasColumnName("Email");
            modelBuilder.Entity<Users>().Property(u => u.IsEmailConfirmed).HasColumnName("Isemailconfirmed");
            modelBuilder.Entity<Users>().Property(u => u.IsPositioningServiceOpen).HasColumnName("Ispositoningserviceopen");
        }
    }
}