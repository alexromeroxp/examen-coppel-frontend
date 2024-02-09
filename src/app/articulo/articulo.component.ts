import { Component, OnInit } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  articulos: Articulo[] = [];
  nuevoArticulo: Articulo = { codigo: 0, descripcion: '', precio: 0, imagen: '', stock: 0 };
  articuloSeleccionado: Articulo | undefined;
  mostrarFormularioAgregar: boolean = false;

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articulos = this.articuloService.getArticulos();
  }

  seleccionarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = { ...articulo };
  }

  agregarArticulo(): void {
    this.articuloService.agregarArticulo({ ...this.nuevoArticulo });
    this.nuevoArticulo = { codigo: 0, descripcion: '', precio: 0, imagen: '', stock: 0 };
  }

  actualizarArticulo(): void {
    if (this.articuloSeleccionado) {
      this.articuloService.actualizarArticulo({ ...this.articuloSeleccionado });
      this.articuloSeleccionado = undefined;
    }
  }

  eliminarArticulo(codigo: number): void {
    this.articulos = this.articuloService.eliminarArticulo(codigo);
    this.articuloSeleccionado = undefined;
  }
}
