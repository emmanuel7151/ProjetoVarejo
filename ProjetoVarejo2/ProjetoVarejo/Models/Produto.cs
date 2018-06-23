using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class Produto
    {
        //{ get; set; }
        public int Id { get; set; }
        //public string Nome { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Tipo { get; set; }
        public double PrecoVenda { get; set; }
        public double PrecoCusto { get; set; }
        public string PosicaoEstoque { get; set; }
        public string Especificação { get; set; }
        public ICollection<PedidoProduto> PedidoProduto { get; set; }
        public ICollection<Estoque> Estoque { get; set; }

    }
}
