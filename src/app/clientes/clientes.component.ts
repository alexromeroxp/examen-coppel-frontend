import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = { id: 0, nombre: '', direccion: '', apellidos: '',carrito:[] };
  clienteSeleccionado: Cliente | undefined;
  mostrarFormularioAgregar: boolean = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = { ...cliente };
  }

  agregarCliente(): void {
    this.clienteService.agregarCliente({ ...this.nuevoCliente });
    this.nuevoCliente = { id: 0, nombre: '', direccion: '', apellidos: '' ,carrito:[]};
  }

  actualizarCliente(): void {
    if (this.clienteSeleccionado) {
      this.clienteService.actualizarCliente({ ...this.clienteSeleccionado });
      this.clienteSeleccionado = undefined;
    }
  }

  eliminarCliente(id: number): void {
    this.clientes = this.clienteService.eliminarCliente(id);
    this.clienteSeleccionado = undefined;
  }
}
