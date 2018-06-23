using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProjetoVarejo.Models;
using ProjetoVarejo.Models.Data;

namespace ProjetoVarejo.Controllers
{
    public class PedidoController : Controller
    {
        private readonly VarejoContext _context;

        public PedidoController(VarejoContext context)
        {
            _context = context;
        }

        // GET: Pedido
        public async Task<IActionResult> Index()
        {
            var varejoContext = _context.Pedido.Include(p => p.Cliente).Include(p => p.Vendedor);
            return View(await varejoContext.ToListAsync());
        }

        // GET: Pedido/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pedido = await _context.Pedido
                .Include(p => p.Cliente)
                .Include(p => p.Vendedor)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (pedido == null)
            {
                return NotFound();
            }

            return View(pedido);
        }

        // GET: Pedido/Create
        public async Task<IActionResult> Create()
        {
            ViewData["ClienteId"] = new SelectList(_context.Cliente, "ID", "ID");
            ViewData["VendedorId"] = new SelectList(_context.Vendedor, "Id", "Id");
            //ViewData["Produtos"]
            var teste = new SelectList(_context.Produto, "Id", "Modelo");
            ViewBag.teste = JsonConvert.SerializeObject(teste);
            return View();
        }

        // POST: Pedido/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(List<Produto> produtos,[Bind("Id,ClienteId,VendedorId,ValorCompra,Desconto,ValorTotal,CupomDeDesconto,MetodoDePagamento,DataCompra,DataVencimento,TaxaDeJuros,DataPagamento")] Pedido pedido)
        {
            if (ModelState.IsValid)
            {

                foreach (Produto produto in produtos){
                    var estoque = await _context.Estoque.Where(c => c.ProdutoID == produto.Id && c.Quantidade > 0).FirstOrDefaultAsync();
                    if (estoque != null)
                    {
                        PedidoProduto pedidoProduto = new PedidoProduto();
                        pedidoProduto.PedidoId = pedido.Id;
                        pedidoProduto.ProdutoId = produto.Id;
                        _context.PedidoProduto.Add(pedidoProduto);
                        estoque.Quantidade = estoque.Quantidade - 1;
                        _context.Estoque.Update(estoque);
                    }
                    else
                    {
                        return View("Index");
                    }


                }

                _context.Add(pedido);
                await _context.SaveChangesAsync();

                
                return RedirectToAction(nameof(Index));
            }

            ViewData["ClienteId"] = new SelectList(_context.Cliente, "ID", "ID", pedido.ClienteId);
            ViewData["VendedorId"] = new SelectList(_context.Vendedor, "Id", "Id", pedido.VendedorId);
            return View(pedido);
        }

        // GET: Pedido/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pedido = await _context.Pedido.SingleOrDefaultAsync(m => m.Id == id);
            if (pedido == null)
            {
                return NotFound();
            }
            ViewData["ClienteId"] = new SelectList(_context.Cliente, "ID", "ID", pedido.ClienteId);
            ViewData["VendedorId"] = new SelectList(_context.Vendedor, "Id", "Id", pedido.VendedorId);
            return View(pedido);
        }

        // POST: Pedido/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ClienteId,VendedorId,ValorCompra,Desconto,ValorTotal,CupomDeDesconto,MetodoDePagamento,DataCompra,DataVencimento,TaxaDeJuros,DataPagamento")] Pedido pedido)
        {
            if (id != pedido.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(pedido);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PedidoExists(pedido.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ClienteId"] = new SelectList(_context.Cliente, "ID", "ID", pedido.ClienteId);
            ViewData["VendedorId"] = new SelectList(_context.Vendedor, "Id", "Id", pedido.VendedorId);
            return View(pedido);
        }

        // GET: Pedido/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pedido = await _context.Pedido
                .Include(p => p.Cliente)
                .Include(p => p.Vendedor)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (pedido == null)
            {
                return NotFound();
            }

            return View(pedido);
        }

        // POST: Pedido/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var pedido = await _context.Pedido.SingleOrDefaultAsync(m => m.Id == id);
            _context.Pedido.Remove(pedido);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PedidoExists(int id)
        {
            return _context.Pedido.Any(e => e.Id == id);
        }
    }
}
