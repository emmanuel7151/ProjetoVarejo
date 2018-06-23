using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoVarejo.Models
{
    public class Cliente
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Uf { get; set; }
        public string Cidade { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Facebook { get; set; }
        public string Instagran { get; set; }
        public Boolean Promoção { get; set; }
        public string Acessibilidade { get; set; }
        
    }
}
