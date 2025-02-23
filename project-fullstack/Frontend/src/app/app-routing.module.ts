import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { LayoutPrincipalComponent } from './components/layout-principal/layout-principal.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipalComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'clientes', component: ClientesComponent },
      { path: 'produtos', component: ProdutosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
