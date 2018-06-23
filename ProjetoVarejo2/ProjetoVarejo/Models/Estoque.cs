using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class Estoque
    {
        public int Id { get; set; }
        public int ProdutoID { get; set; }
        public int Quantidade { get; set; }
        public double ValorUnitario { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataEntrada { get; set; }
        public Produto Produto { get; set; }
        

    }
}
