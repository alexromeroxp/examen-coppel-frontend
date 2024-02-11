import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../interfaces/articulo.interface';
import { Cliente } from '../../interfaces/cliente.interface';
import { ComprasService } from '../../services/compras.service';
import { ClienteService } from '../../services/cliente.service';
import { ArticuloService } from '../../services/articulo.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent implements OnInit {
  cliente!: Cliente
  articulos: Articulo[] = [];

  articuloSeleccionado: Articulo | undefined;
  cantidadSeleccionada = 1;

  constructor(
    private clienteService: ClienteService,
    private articuloService: ArticuloService,
    private comprasService: ComprasService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.cliente = this.authService.getUserInfo();
    this.articuloService.getArticulos().subscribe(articulos => {
      this.articulos = articulos.filter((articulo) =>
        this.cliente.carrito.every(articuloCarrito => articuloCarrito.articulo.articuloId !== articulo.articuloId)
      );
    });
  }

  seleccionarArticulo(articulo: Articulo): void {
    this.articuloSeleccionado = articulo;
  }

  agregarAlCarrito(): void {
    if (this.cliente && this.articuloSeleccionado) {
      this.comprasService.agregarAlCarrito({
        clienteId: this.cliente.clienteId,
        articuloId: this.articuloSeleccionado.articuloId,
        cantidad: this.cantidadSeleccionada
      }
      ).subscribe((result) => {
        let currentUser = this.authService.getUserInfo()
        currentUser.carrito.push({articulo:result.articulo,cantidad:result.cantidad})
        this.ngOnInit()
      })
      this.articuloSeleccionado = undefined;
      this.cantidadSeleccionada = 1;
    }
  }
}
