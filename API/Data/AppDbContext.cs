using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<Race> Races => Set<Race>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<AppUser>()
            .HasIndex(u => u.Email).IsUnique();

        b.Entity<Race>()
            .HasOne(r => r.User)
            .WithMany(u => u.Races)
            .HasForeignKey(r => r.UserId);
    }
}
