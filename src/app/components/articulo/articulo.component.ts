import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../interfaces/articulo.interface';
import { ArticuloService } from '../../services/articulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  articulos: Articulo[] = [];
  nuevoArticulo: Articulo = { articuloId: 0, codigo: '', descripcion: '', precio: 0, imagen: '', stock: 0 };
  articuloSeleccionado: Articulo | undefined;
  mostrarFormularioAgregar: boolean = false;

  constructor(private articuloService: ArticuloService, private router: Router) { }

  ngOnInit(): void {
    this.articuloService.getArticulos()
      .subscribe((articulos: Articulo[]) => this.articulos = articulos);
  }

  seleccionarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = { ...articulo };
  }

  agregarArticulo(): void {
    this.articuloService.crearArticulo({ ...this.nuevoArticulo })
      .subscribe(() => {
        this.ngOnInit()
      });
    this.nuevoArticulo = { articuloId: 0, codigo: '', descripcion: '', precio: 0, imagen: '', stock: 0 };
  }

  actualizarArticulo(): void {
    if (this.articuloSeleccionado) {
      this.articuloService.editarArticulo({ ...this.articuloSeleccionado })
        .subscribe(() =>
          this.ngOnInit()
        );
      this.articuloSeleccionado = undefined;
    }
  }

  eliminarArticulo(id: number): void {
    this.articuloService.borrarArticulo(id)
      .subscribe(() => {
        this.ngOnInit();
      });
    this.articuloSeleccionado = undefined;
  }
}
