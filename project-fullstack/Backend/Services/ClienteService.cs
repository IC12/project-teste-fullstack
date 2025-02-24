using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class ClienteService
    {
        private readonly ClienteRepository _repository;

        public ClienteService(ClienteRepository repository)
        {
            _repository = repository;
        }

        public List<Cliente> GetClientes()
        {
            return _repository.GetClientes();
        }

        public Cliente? GetClienteById(int id)
        {
            return _repository.GetClienteById(id);
        }

        public void AddCliente(Cliente cliente)
        {
            if (string.IsNullOrWhiteSpace(cliente.Nome) || cliente.Nome.Length < 3)
                throw new ArgumentException("O nome do cliente deve ter no mínimo 3 caracteres.");

            _repository.AddCliente(cliente);
        }

        public void UpdateCliente(Cliente cliente)
        {
            _repository.UpdateCliente(cliente);
        }

        public void DeleteCliente(int id)
        {
            _repository.DeleteCliente(id);
        }
    }
}
