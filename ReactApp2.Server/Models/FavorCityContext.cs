using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models
{
    public class FavorCityContext : DbContext
    {
        public FavorCityContext(DbContextOptions<FavorCityContext> options) : base(options) { }

        public DbSet<FavorCity> Favorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<FavorCity>().ToTable("Favorcity", schema: "dbo");

            modelBuilder.Entity<FavorCity>().Property(u => u.Id).HasColumnName("Id");
            modelBuilder.Entity<FavorCity>().Property(u => u.City).HasColumnName("City");
            modelBuilder.Entity<FavorCity>().Property(u => u.Country).HasColumnName("Country");
        }
    }
}