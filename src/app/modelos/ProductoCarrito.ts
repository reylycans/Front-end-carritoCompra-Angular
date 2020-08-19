import {Producto} from './Productos';
import {EstadoCarrito} from './EstadoCarrito';

export class ProductoCarrito{
   id: number;
   producto: Producto;
   carrito: EstadoCarrito;
   cantidad: number
}