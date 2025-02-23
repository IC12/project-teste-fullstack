using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Definir algumas regras de validação (boas práticas)
            modelBuilder.Entity<Cliente>()
                .Property(c => c.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Email)
                .IsRequired();

            modelBuilder.Entity<Cliente>()
                .Property(c => c.Telefone)
                .IsRequired();

            modelBuilder.Entity<Produto>()
                .Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Preco)
                .IsRequired()
                .HasPrecision(18,2);

            modelBuilder.Entity<Produto>()
                .Property(p => p.Estoque)
                .IsRequired();
        }
    }
}
