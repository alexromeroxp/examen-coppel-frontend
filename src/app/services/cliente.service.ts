import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { clientes } from '../mocks/clientes';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientes: Cliente[] = clientes

  getClientes(): Cliente[] {
    return this.clientes;
  }

  getCliente(id: number): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  agregarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  actualizarCliente(cliente: Cliente): void {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  eliminarCliente(id: number): any {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    return this.clientes;
  }
}
