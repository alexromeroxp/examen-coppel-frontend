import { Component, OnInit } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { ComprasService } from '../services/compras.service';
import { articulos } from '../mocks/articulos';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent implements OnInit {
  clientes: Cliente[] = [];

  articulosDisponibles: Articulo[] = articulos

  clienteSeleccionado: Cliente | undefined;
  articuloSeleccionado: Articulo | undefined;
  cantidadSeleccionada = 1;

  constructor(private comprasService: ComprasService) {}

  ngOnInit(): void {
    this.clientes = this.comprasService.getClientes();
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
  }

  seleccionarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = articulo;
  }

  agregarAlCarrito(): void {
    if (this.clienteSeleccionado && this.articuloSeleccionado) {
      this.comprasService.agregarAlCarrito(
        this.clienteSeleccionado.id,
        this.articuloSeleccionado,
        this.cantidadSeleccionada
      );
      this.clienteSeleccionado = undefined;
      this.articuloSeleccionado = undefined;
      this.cantidadSeleccionada = 1;
    }
  }
}
