import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { articulos } from '../mocks/articulos';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private articulos: Articulo[] = articulos

  getArticulos(): Articulo[] {
    return this.articulos;
  }

  getArticulo(codigo: number): Articulo | undefined {
    return this.articulos.find(articulo => articulo.codigo === codigo);
  }

  agregarArticulo(articulo: Articulo): void {
    this.articulos.push(articulo);
  }

  actualizarArticulo(articulo: Articulo): void {
    const index = this.articulos.findIndex(a => a.codigo === articulo.codigo);
    if (index !== -1) {
      this.articulos[index] = articulo;
    }
  }

  eliminarArticulo(codigo: number): any {
    this.articulos = this.articulos.filter(articulo => articulo.codigo !== codigo);
    return this.articulos
  }
}
