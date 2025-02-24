import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtoForm: FormGroup;
  listProdutos: Produto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'preco', 'estoque', 'actions'];
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource();
  showProdutosList: boolean = false;
  editMode: boolean = false;
  selectedProduto: Produto | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.produtoForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      preco: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(/^\d+([.,]\d{1,2})?$/),
        ],
      ],
      estoque: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.loadProdutos();
  }

  addProduto(): void {
    if (this.produtoForm.valid) {
      const produtoData = this.produtoForm.value;
      if (this.editMode && this.selectedProduto) {
        this.apiService
          .editProduto(this.selectedProduto.id, produtoData)
          .subscribe((updatedProduto: Produto) => {
            const index = this.listProdutos.findIndex(
              (c) => c.id === updatedProduto.id
            );
            if (index !== -1) {
              this.listProdutos[index] = updatedProduto;
              this.dataSource.data = this.listProdutos;
            }
            this.clearForm();
            this.showProdutosList = true;
          });
      } else {
        this.apiService
          .createProduto(produtoData)
          .subscribe((newProduto: Produto) => {
            this.listProdutos.push(newProduto);
            this.dataSource.data = this.listProdutos;
            this.clearForm();
          });
      }
    }
  }

  clearForm(): void {
    this.produtoForm.reset();
    this.editMode = false;
    this.selectedProduto = null;
  }

  showProdutos(): void {
    this.showProdutosList = true;
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.apiService.getProdutos().subscribe((produtos: Produto[]) => {
      this.listProdutos = produtos;
      this.dataSource.data = this.listProdutos;
    });
  }

  editProduto(produto: Produto): void {
    this.editMode = true;
    this.selectedProduto = produto;
    this.produtoForm.patchValue(produto);
    this.showProdutosList = false;
  }

  deleteProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.apiService.deleteProduto(id).subscribe(() => {
        this.listProdutos = this.listProdutos.filter(
          (produto) => produto.id !== id
        );
        this.dataSource.data = this.listProdutos;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goBackToForm(): void {
    this.showProdutosList = false;
  }
}
