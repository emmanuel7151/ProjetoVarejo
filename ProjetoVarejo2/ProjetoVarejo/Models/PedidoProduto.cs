using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class PedidoProduto
    {
        public int ProdutoId { get; set; }
        public int PedidoId { get; set; }
        public Produto Produto { get; set; }
        public Pedido Pedido { get; set; }

    }
}
