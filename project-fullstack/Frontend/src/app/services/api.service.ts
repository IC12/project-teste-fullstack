import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrlClientes = 'http://localhost:5000/api/clientes';
  private apiUrlProdutos = 'http://localhost:5000/api/produtos';

  constructor(private http: HttpClient) {}

  // Listar todos os clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrlClientes);
  }

  // Criar um cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrlClientes, cliente);
  }

  // Editar um cliente
  editCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrlClientes}/${id}`, cliente);
  }

  // Deletar um cliente
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlClientes}/${id}`);
  }

  // Obter um cliente por ID
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrlClientes}/${id}`);
  }

  // Listar todos os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrlProdutos);
  }

  // Criar um produto
  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrlProdutos, produto);
  }

  // Editar um produto
  editProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrlProdutos}/${id}`, produto);
  }

  // Deletar um produto
  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlProdutos}/${id}`);
  }

  // Obter um produto por ID
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrlProdutos}/${id}`);
  }
}
