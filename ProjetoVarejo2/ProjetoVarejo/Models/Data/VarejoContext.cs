using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models.Data
{
    public class VarejoContext : DbContext
    {
        public VarejoContext(DbContextOptions<VarejoContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<PedidoProduto> PedidoProduto { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Vendedor> Vendedor { get; set; }
        public DbSet<Estoque> Estoque { get; set; }
        public DbSet<Pagamento> Pagamento { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>().ToTable("Cliente");
            modelBuilder.Entity<Pedido>().ToTable("Pedido");
            modelBuilder.Entity<PedidoProduto>().ToTable("PedidoProduto");
            modelBuilder.Entity<Produto>().ToTable("Produto");
            modelBuilder.Entity<Vendedor>().ToTable("Vendedor");
            modelBuilder.Entity<Estoque>().ToTable("Estoque");
            modelBuilder.Entity<Pagamento>().ToTable("Pagamento");

            modelBuilder.Entity<PedidoProduto>()
               .HasKey(c => new { c.PedidoId, c.ProdutoId});
        }

    }
}
