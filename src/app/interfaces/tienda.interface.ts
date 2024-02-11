import { Articulo } from "./articulo.interface";

export interface Tienda {
  tiendaId: number;
  sucursal: string;
  direccion: string;
  articulos: Articulo[];
}
