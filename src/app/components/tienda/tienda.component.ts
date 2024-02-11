import { Component, OnInit } from '@angular/core';
import { Tienda } from '../../interfaces/tienda.interface';
import { TiendaService } from '../../services/tienda.service';
import { Articulo } from '../../interfaces/articulo.interface';
import { ArticuloService } from '../../services/articulo.service';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  tiendas: Tienda[] = [];
  nuevaTienda: Tienda = { tiendaId: 0, sucursal: '', direccion: '', articulos: [] };
  tiendaSeleccionada: Tienda | undefined;
  mostrarFormularioAgregar: boolean = false;
  nuevaCantidad!: number;
  nuevoArticuloSeleccionado: any;
  articulosDisponibles: Articulo[] = []
  mostrarFormularioAgregarArticulos: boolean = false
  nuevoArticulo: Articulo = { articuloId: 0, codigo: '', descripcion: '', precio: 0, imagen: '', stock: 0 };


  constructor(private tiendaService: TiendaService, private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.tiendaService.getTiendas().subscribe(tiendas => this.tiendas = tiendas);
    this.articuloService.getArticulos().subscribe(articulos => {
      this.articulosDisponibles = articulos
    });
  }

  seleccionarTienda(tienda: Tienda): void {
    this.tiendaSeleccionada = { ...tienda };
  }

  agregarTienda(): void {
    this.tiendaService.crearTienda({ ...this.nuevaTienda }).subscribe(() =>
      this.ngOnInit());
    this.nuevaTienda = { tiendaId: 0, sucursal: '', direccion: '', articulos: [] };
  }

  actualizarTienda(): void {
    if (this.tiendaSeleccionada) {
      this.tiendaService.editarTienda({ ...this.tiendaSeleccionada }).subscribe(() => this.ngOnInit());
      this.tiendaSeleccionada = undefined;
    }
  }

  eliminarTienda(tiendaId: number): void {
    this.tiendaService.borrarTienda(tiendaId).subscribe(() => this.ngOnInit())
    this.tiendaSeleccionada = undefined;
  }

  agregarArticuloATienda(): void {
    if (this.tiendaSeleccionada) {
      this.tiendaService.agregarArticuloATienda(
        this.tiendaSeleccionada.tiendaId, this.nuevoArticuloSeleccionado.articuloId
      ).subscribe(() => this.ngOnInit());
    }
    this.tiendaSeleccionada = undefined;
  }
}
