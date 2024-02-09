import { Articulo } from "./articulo.interface";

export interface Tienda {
  sucursal: string;
  direccion: string;
  articulos: Articulo[];
}
