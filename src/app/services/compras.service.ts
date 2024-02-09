import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { clientes } from '../mocks/clientes';


@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private clientes: Cliente[] = clientes

  getClientes(): Cliente[] {
    return this.clientes;
  }

  agregarAlCarrito(clienteId: number, articulo: Articulo, cantidad: number): void {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (cliente) {
      const articuloExistente = cliente.carrito.find(item => item.articulo.codigo === articulo.codigo);

      if (articuloExistente) {
        articuloExistente.cantidad  = parseInt(articuloExistente.cantidad.toString()) + parseInt(cantidad.toString())
      } else {
        cliente.carrito.push({ articulo, cantidad });
      }
    }
  }
}
