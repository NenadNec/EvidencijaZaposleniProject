using EvidencijaProject.Models;
using Microsoft.EntityFrameworkCore;



public class EvidencijaDbContext : DbContext
{
    public EvidencijaDbContext(DbContextOptions<EvidencijaDbContext> options) : base(options)
    {
    }

    public DbSet<Korisnik> Korisnici { get; set; }
    public DbSet<Zaposleni> Zaposleni { get; set; }
    public DbSet<Kupci> Kupci { get; set; }
    public DbSet<Magacin> Magacini { get; set; }
    public DbSet<MagacinZaposleni> MagacinZaposleni { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MagacinZaposleni>()
            .HasKey(mz => new { mz.ZaposleniId, mz.MagacinId });

        modelBuilder.Entity<MagacinZaposleni>()
            .HasOne(mz => mz.Zaposleni)
            .WithMany(z => z.Magacini)
            .HasForeignKey(mz => mz.ZaposleniId);

        modelBuilder.Entity<MagacinZaposleni>()
            .HasOne(mz => mz.Magacin)
            .WithMany(m => m.MagacinZaposleni)
            .HasForeignKey(mz => mz.MagacinId);

        modelBuilder.Entity<Kupci>()
            .HasOne(k => k.Zaposleni)
            .WithMany()
            .HasForeignKey(k => k.ZaposleniId);

        base.OnModelCreating(modelBuilder);
    }

}
