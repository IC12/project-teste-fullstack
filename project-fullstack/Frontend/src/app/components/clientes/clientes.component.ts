import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup;
  listClientes: Cliente[] = [];
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'telefone',
    'ativo',
    'actions',
  ];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource();
  showClientesList: boolean = false;
  editMode: boolean = false;
  selectedCliente: Cliente | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      ativo: [true],
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  addCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      if (this.editMode && this.selectedCliente) {
        this.apiService
          .editCliente(this.selectedCliente.id, clienteData)
          .subscribe((updatedCliente: Cliente) => {
            const index = this.listClientes.findIndex(
              (c) => c.id === updatedCliente.id
            );
            if (index !== -1) {
              this.listClientes[index] = updatedCliente;
              this.dataSource.data = this.listClientes;
            }
            this.clearForm();
            this.showClientesList = true;
          });
      } else {
        this.apiService
          .createCliente(clienteData)
          .subscribe((newCliente: Cliente) => {
            this.listClientes.push(newCliente);
            this.dataSource.data = this.listClientes;
            this.clearForm();
          });
      }
    }
  }

  clearForm(): void {
    this.clienteForm.reset();
    this.editMode = false;
    this.selectedCliente = null;
    this.clienteForm.get('ativo').setValue(false);
  }

  showClientes(): void {
    this.showClientesList = true;
    this.loadClientes();
  }

  loadClientes(): void {
    this.apiService.getClientes().subscribe((clientes: Cliente[]) => {
      this.listClientes = clientes;
      this.dataSource.data = this.listClientes;
    });
  }

  editCliente(cliente: Cliente): void {
    this.editMode = true;
    this.selectedCliente = cliente;
    this.clienteForm.patchValue(cliente);
    this.showClientesList = false;
  }

  deleteCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.apiService.deleteCliente(id).subscribe(() => {
        this.listClientes = this.listClientes.filter(
          (cliente) => cliente.id !== id
        );
        this.dataSource.data = this.listClientes;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goBackToForm(): void {
    this.showClientesList = false;
  }
}
