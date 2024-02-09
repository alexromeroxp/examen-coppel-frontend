import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ComprasComponent } from './compras/compras.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    LoginComponent,
    ArticuloComponent,
    TiendaComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
