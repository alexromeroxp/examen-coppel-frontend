import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = { clienteId: 0, nombre: '', direccion: '', apellidos: '', carrito: [] };
  clienteSeleccionado: any | undefined;
  mostrarFormularioAgregar: boolean = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = { ...cliente };
  }

  agregarCliente(): void {
    this.clienteService.crearCliente(this.nuevoCliente).subscribe(result => {
      this.ngOnInit()
    });
    this.nuevoCliente = { clienteId: 0, nombre: '', direccion: '', apellidos: '', carrito: [] };
  }

  actualizarCliente(): void {
    if (this.clienteSeleccionado) {
      this.clienteService.editarCliente(this.clienteSeleccionado).subscribe(() => {
        this.ngOnInit();
      })
      this.clienteSeleccionado = undefined;
    }
  }

  eliminarCliente(id: number): void {
    this.clienteService.borrarCliente(id).subscribe(result => {
      this.clienteSeleccionado = undefined;
      this.ngOnInit();
    })
  }
}
