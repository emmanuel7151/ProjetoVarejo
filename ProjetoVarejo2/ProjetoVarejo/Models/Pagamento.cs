using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class Pagamento
    {
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataVencimento { get; set; }
        public int Quantidade { get; set; }
        public double ValorParcela { get; set; }
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
    }
}
