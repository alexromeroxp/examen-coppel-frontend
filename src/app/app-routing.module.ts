import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './components/login/login.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ComprasComponent } from './components/compras/compras.component';
import { authGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { isAuthenticathedGuard } from './guards/is-authenticathed.guard';

const routes: Routes = [
  { path: '', redirectTo: "inicio", pathMatch: "full" },
  { path: "clientes", component: ClientesComponent, canActivate: [authGuard] },
  { path: "articulos", component: ArticuloComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent,canActivate:[isAuthenticathedGuard] },
  { path: 'tiendas', component: TiendaComponent, canActivate: [authGuard] },
  { path: 'compras', component: ComprasComponent, canActivate: [authGuard] },
  { path: 'inicio', component: InicioComponent },
  { path: '**', component:InicioComponent },





]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
