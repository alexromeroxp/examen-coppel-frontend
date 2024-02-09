import { Injectable } from '@angular/core';
import { Tienda } from '../interfaces/tienda.interface';
import { tiendas } from '../mocks/tiendas';
import { Articulo } from '../interfaces/articulo.interface';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private tiendas: Tienda[] = tiendas

  getTiendas(): Tienda[] {
    return this.tiendas;
  }

  getTienda(sucursal: string): Tienda | undefined {
    return this.tiendas.find(tienda => tienda.sucursal === sucursal);
  }

  agregarTienda(tienda: Tienda): void {
    this.tiendas.push(tienda);
  }

  actualizarTienda(tienda: Tienda): void {
    const index = this.tiendas.findIndex(t => t.sucursal === tienda.sucursal);
    if (index !== -1) {
      this.tiendas[index] = tienda;
    }
  }

  eliminarTienda(sucursal: string): any {
    this.tiendas = this.tiendas.filter(tienda => tienda.sucursal !== sucursal);
    return this.tiendas
  }

  agregarArticuloATienda(sucursal: string, articulo: Articulo): void {
    const tienda = this.getTienda(sucursal);
    if (tienda) {
      tienda.articulos.push(articulo);
    }
  }
}
