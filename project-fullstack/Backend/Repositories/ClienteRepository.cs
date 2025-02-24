using Backend.Data;
using Backend.Models;

namespace Backend.Repositories
{
    public class ClienteRepository
    {
        private readonly AppDbContext _context;

        public ClienteRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Cliente> GetClientes()
        {
            return _context.Clientes.ToList();
        }

        public Cliente? GetClienteById(int id)
        {
            return _context.Clientes.Find(id);
        }

        public void AddCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
        }

        public void UpdateCliente(Cliente cliente)
        {
            var existingCliente = _context.Clientes.Find(cliente.Id);
            if (existingCliente == null)
                throw new InvalidOperationException("Cliente não encontrado.");

            _context.Entry(existingCliente).CurrentValues.SetValues(cliente);
            _context.SaveChanges();
        }

        public void DeleteCliente(int id)
        {
            var cliente = _context.Clientes.Find(id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
            }
        }
    }
}
