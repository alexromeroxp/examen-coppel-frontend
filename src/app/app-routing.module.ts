import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ComprasComponent } from './compras/compras.component';

const routes: Routes = [
  { path: "clientes", component: ClientesComponent },
  { path: "articulos", component: ArticuloComponent },
  { path: "login", component: LoginComponent },
  { path: 'tiendas', component: TiendaComponent },
  { path: 'compras', component: ComprasComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
