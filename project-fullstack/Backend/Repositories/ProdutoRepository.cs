using Backend.Data;
using Backend.Models;

namespace Backend.Repositories
{
    public class ProdutoRepository
    {
        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Produto> GetProdutos()
        {
            return _context.Produtos.ToList();
        }

        public Produto? GetProdutoById(int id)
        {
            return _context.Produtos.Find(id);
        }

        public void AddProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();
        }

        public void UpdateProduto(Produto produto)
        {
            var existingProduto = _context.Produtos.Find(produto.Id);
            if (existingProduto == null)
                throw new InvalidOperationException("Cliente não encontrado.");

            _context.Entry(existingProduto).CurrentValues.SetValues(produto);
            _context.SaveChanges();
        }

        public void DeleteProduto(int id)
        {
            var produto = _context.Produtos.Find(id);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
                _context.SaveChanges();
            }
        }
    }
}
