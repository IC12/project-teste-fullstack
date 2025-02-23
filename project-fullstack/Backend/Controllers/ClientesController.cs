using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ClienteService _service;

        public ClientesController(ClienteService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Cliente>> Get()
        {
            return _service.GetClientes();
        }

        [HttpGet("{id}")]
        public ActionResult<Cliente> Get(int id)
        {
            var cliente = _service.GetClienteById(id);
            if (cliente == null) return NotFound();
            return cliente;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            if (cliente.Telefone <= 0)
                return BadRequest("O telefone deve ser um número válido.");

            _service.AddCliente(cliente);
            return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Cliente cliente)
        {
            var existing = _service.GetClienteById(id);
            if (existing == null) return NotFound();

            if (cliente.Telefone <= 0)
                return BadRequest("O telefone deve ser um número válido.");

            cliente.Id = id;
            _service.UpdateCliente(cliente);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _service.GetClienteById(id);
            if (existing == null) return NotFound();

            _service.DeleteCliente(id);
            return NoContent();
        }
    }
}
