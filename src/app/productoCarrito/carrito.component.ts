import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ProductoCarrito } from '../modelos/productoCarrito';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { EstadoCarrito } from '../modelos/EstadoCarrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public productoCarrito: ProductoCarrito[];
  private productoCart: ProductoCarrito = new ProductoCarrito();
  private carritoStatus: EstadoCarrito = new EstadoCarrito();
  faTrash = faTrash;

  constructor(private productoService:ServiceService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerProductosCarrito();
  }

  obtenerProductosCarrito(){
    this.productoService.obtenerProductosCarrito().subscribe(data=>{
      this.productoCarrito = data;
      console.log(this.productoCarrito);
    });
  } 

  alimentarStatus(){
    this.carritoStatus.id = 2;
    this.carritoStatus.estado = "completado";
  }

  agregarDatos(producto){
    this.alimentarStatus();
    this.productoCart.id = producto.id;
    this.productoCart.producto = producto;
    this.productoCart.carrito = this.carritoStatus;
  }

  actualizarEstado(producto){
    this.agregarDatos(producto);
    this.productoService.actualizarEstado(this.productoCart).subscribe(response=>{
      this.obtenerProductosCarrito();
    })
  }

  eliminarProductoCarrito(producto){
    this.productoService.eliminarProductoCarrito(producto.id).subscribe(response=>{
      this.productoCarrito = this.productoCarrito.filter(pro=> pro !== producto);
      this.productoService.contador = this.productoCarrito.length;
    });
  }
}
