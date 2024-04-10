using APIBatizoNovato.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIBatizoNovato.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base (options) { }

    public DbSet<Login> Logins { get; set; }
    public DbSet<RegraImposto> RegraDeImpostos { get; set; }
    public DbSet<Produto> Produtos { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Login>().HasKey(e => e.Id);
        modelBuilder.Entity<RegraImposto>().HasKey(e => e.Codigo);
        modelBuilder.Entity<Produto>().HasKey(e => e.Codigo);

        modelBuilder.Entity<RegraImposto>().Property(e => e.Taxa).HasPrecision(5,2);
        modelBuilder.Entity<Produto>().Property(e => e.PrecoDeCusto).HasPrecision(12,2);
        modelBuilder.Entity<Produto>().Property(e => e.Markup).HasPrecision(8,2);
        modelBuilder.Entity<Produto>().Property(e => e.PrecoDeVenda).HasPrecision(12,2);
        modelBuilder.Entity<Produto>().Property(e => e.MargemReal).HasPrecision(8,2);


        modelBuilder
            .Entity<RegraImposto>()
            .HasMany(e => e.Produto)
            .WithOne(e => e.RegraImposto)
            .HasForeignKey(e => e.RegraDeImpostoId);

        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured)
            optionsBuilder.UseSqlServer("DefaultConnection");

        base.OnConfiguring(optionsBuilder);
    }
}
