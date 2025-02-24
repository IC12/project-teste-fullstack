using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/produtos")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutoService _service;

        public ProdutosController(ProdutoService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Produto>> Get()
        {
            return _service.GetProdutos();
        }

        [HttpGet("{id}")]
        public ActionResult<Produto> Get(int id)
        {
            var produto = _service.GetProdutoById(id);
            if (produto == null) return NotFound();
            return produto;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Produto produto)
        {
            _service.AddProduto(produto);
            return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Produto produto)
        {
            var existing = _service.GetProdutoById(id);
            if (existing == null) return NotFound();

            produto.Id = id;
            _service.UpdateProduto(produto);
            return Ok(produto);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _service.GetProdutoById(id);
            if (existing == null) return NotFound();

            _service.DeleteProduto(id);
            return NoContent();
        }
    }
}
