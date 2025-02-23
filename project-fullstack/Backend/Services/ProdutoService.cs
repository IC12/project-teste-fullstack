using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class ProdutoService
    {
        private readonly ProdutoRepository _repository;

        public ProdutoService(ProdutoRepository repository)
        {
            _repository = repository;
        }

        public List<Produto> GetProdutos()
        {
            return _repository.GetProdutos();
        }

        public Produto? GetProdutoById(int id)
        {
            return _repository.GetProdutoById(id);
        }

        public void AddProduto(Produto produto)
        {
            if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Nome.Length < 3)
                throw new ArgumentException("O nome do produto deve ter no mínimo 3 caracteres.");

            if (produto.Preco <= 0)
                throw new ArgumentException("O preço do produto deve ser maior que 0.");

            if (produto.Estoque < 0)
                throw new ArgumentException("O estoque do produto deve ser maior ou igual a 0.");

            _repository.AddProduto(produto);
        }

        public void UpdateProduto(Produto produto)
        {
            _repository.UpdateProduto(produto);
        }

        public void DeleteProduto(int id)
        {
            _repository.DeleteProduto(id);
        }
    }
}
