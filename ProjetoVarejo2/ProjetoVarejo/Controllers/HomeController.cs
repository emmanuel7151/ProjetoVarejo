using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoVarejo.Models;
using ProjetoVarejo.Models.Data;

namespace ProjetoVarejo.Controllers
{
    public class HomeController : Controller
    {
        private readonly VarejoContext _context;

        public HomeController(VarejoContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }
        public IActionResult GerarEtiqueta()
        {
            return View("GerarEtiqueta");
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> RelEstoqueAsync()
        { 
            
            return View("RelPosicaoEstoque", await _context.Produto.ToListAsync());
        }

        public IActionResult Relatorios()
        {
            //ViewData["Message"] = "Your contact page.";

            return View("Relatorios");
        }
        public async Task<IActionResult> RelProdutosLiq()
        {
            var relatorioBar = new List<RelatorioBar>();

            var Produtos = await _context.Produto.ToListAsync();

            foreach (Produto produto in Produtos)
            {
                //var dataTeste = DateTime.Parse("01/01/2019 00:00:00");
                //var teste = (DateTime.Now - dataTeste);
                var estoque = await _context.Estoque.Where(c => c.ProdutoID == produto.Id && c.Quantidade > 1 && (DateTime.Now - c.DataEntrada).Days >= 120).FirstOrDefaultAsync();
                if (estoque != null)
                {
                    relatorioBar.Add(new RelatorioBar
                    {
                        DimensionOne = produto.Modelo,
                        Quantity = estoque.Quantidade
                    });
                }
            }

            return View("RelLiquida", relatorioBar);
        }

        public async Task<IActionResult> RelAbc()
        {
            var relatorioBar = new List<RelatorioBar>();
            
            var Produtos = await _context.Produto.ToListAsync();
          
            //PedidoProduto teste = new PedidoProduto();
            foreach(Produto produto in Produtos)
            {
                var pedidos = await _context.PedidoProduto.Where(c => c.ProdutoId == produto.Id).ToListAsync();
                relatorioBar.Add(new RelatorioBar
                {
                    DimensionOne = produto.Modelo,
                    Quantity = pedidos.Count()
                });
            }
           
            relatorioBar = relatorioBar.OrderByDescending(c => c.Quantity).ToList();
            return View("RelatorioABC", relatorioBar);
        }

    }
}
