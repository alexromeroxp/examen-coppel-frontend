import { Articulo } from "./articulo.interface";

export interface Cliente {
    clienteId: number;
    nombre: string;
    direccion: string;
    apellidos: string;
    carrito: ArticuloEnCarrito[];
  }

  export interface ArticuloEnCarrito {
    articulo: Articulo;
    cantidad: number;
  }
  
  