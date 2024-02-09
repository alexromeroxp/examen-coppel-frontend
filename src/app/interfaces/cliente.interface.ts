import { Articulo } from "./articulo.interface";

export interface Cliente {
    id: number;
    nombre: string;
    direccion: string;
    apellidos: string;
    carrito: ArticuloEnCarrito[];
  }

  export interface ArticuloEnCarrito {
    articulo: Articulo;
    cantidad: number;
  }
  
  