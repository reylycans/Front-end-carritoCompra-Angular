import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { Producto } from './modelos/Productos';
import { map, catchError, tap } from 'rxjs/operators';
import { ProductoCarrito } from './modelos/productoCarrito';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  contador: number = 0;

  private endPoint: string = 'http://localhost:8080';

  crearProducto(producto: Producto){
   return this.http.post(`${this.endPoint}/producto`,producto).pipe(
      catchError(e => {
         if (e.status === 401){
          return throwError(e);
         }
      })
     );
  }

  obtenerProductos():Observable <Producto[]>{
    return this.http.get(`${this.endPoint}/producto`).pipe(
      map((response) => response as Producto[])
  );
  }

  obtenerProductosCarrito():Observable <ProductoCarrito[]>{
    return this.http.get(`${this.endPoint}/productoCarrito`).pipe(
      map((response) => response as ProductoCarrito[])
    );
  }

  agregarProductoCarrito(productoCarrito: ProductoCarrito){
   return this.http.post(`${this.endPoint}/productoCarrito`,productoCarrito).pipe(
      catchError(e => {
         if (e.status === 401){
          return throwError(e);
         }
      })
     );
  }

  eliminarProductoCarrito(id:number): Observable<void>{
    return this.http.delete<void>(`${this.endPoint}/productoCarrito/${id}`);
  }

  actualizarEstado(productoCarrito: ProductoCarrito){
    return this.http.put(`${this.endPoint}/productoCarrito`,productoCarrito).pipe(
      catchError(e => {
         if (e.status === 401){
          return throwError(e);
         }
      })
     );
  }

}
