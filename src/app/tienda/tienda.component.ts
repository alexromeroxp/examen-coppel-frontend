import { Component, OnInit } from '@angular/core';
import { Tienda } from '../interfaces/tienda.interface';
import { TiendaService } from '../services/tienda.service';
import { Articulo } from '../interfaces/articulo.interface';
import { articulos } from '../mocks/articulos';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  tiendas: Tienda[] = [];
  nuevaTienda: Tienda = { sucursal: '', direccion: '', articulos: [] };
  tiendaSeleccionada: Tienda | undefined;
  mostrarFormularioAgregar: boolean = false;
  nuevaCantidad!: number;
  nuevoArticuloSeleccionado: any;
  articulosDisponibles: Articulo[] = articulos
  mostrarFormularioAgregarArticulos: boolean = false
  nuevoArticulo: Articulo = { codigo: 0, descripcion: '', precio: 0, imagen: '', stock: 0 };


  constructor(private tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.tiendas = this.tiendaService.getTiendas();

  }

  seleccionarTienda(tienda: Tienda): void {
    this.tiendaSeleccionada = { ...tienda };
    this.articulosDisponibles = articulos.filter(obj1 => tienda.articulos.every(obj2 => obj1.descripcion !== obj2.descripcion));
  }

  agregarTienda(): void {
    this.tiendaService.agregarTienda({ ...this.nuevaTienda });
    this.nuevaTienda = { sucursal: '', direccion: '', articulos: [] };
  }

  actualizarTienda(): void {
    if (this.tiendaSeleccionada) {
      this.tiendaService.actualizarTienda({ ...this.tiendaSeleccionada });
      this.tiendaSeleccionada = undefined;
    }
  }

  eliminarTienda(sucursal: string): void {
    this.tiendas = this.tiendaService.eliminarTienda(sucursal);
    this.tiendaSeleccionada = undefined;
  }

  agregarArticulo(tienda: Tienda): void {
    if (this.tiendaSeleccionada) {
      this.tiendaService.agregarArticuloATienda(
        this.tiendaSeleccionada.sucursal,
        { ...this.nuevoArticuloSeleccionado }
      );
      this.articulosDisponibles = articulos.filter(obj1 => tienda.articulos.every(obj2 => obj1.descripcion !== obj2.descripcion));
      this.nuevoArticulo = { codigo: 0, descripcion: '', precio: 0, imagen: '', stock: 0 };
    }
  }
}
