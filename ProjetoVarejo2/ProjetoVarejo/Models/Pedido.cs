using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int VendedorId { get; set; }
        //public int PedidoProdutoId { get; set; }
        public double ValorCompra { get; set; }
        public double Desconto { get; set; }
        public double ValorTotal { get; set; }
        public string CupomDeDesconto { get; set; }
        public string MetodoDePagamento { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataCompra { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataVencimento { get; set; }
        public Boolean Status { get; set; }
        public double TaxaDeJuros { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataPagamento { get; set; }
        public int DiasAtraso { get; set; }
        public Cliente Cliente { get; set; }
        public Vendedor Vendedor { get; set; }
        public ICollection<PedidoProduto>  PedidoProduto{ get; set; }


}
}
