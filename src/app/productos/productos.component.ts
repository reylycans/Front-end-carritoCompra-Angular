import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/Productos';
import {ServiceService} from '../service.service';
import { ProductoCarrito } from '../modelos/productoCarrito';
import { EstadoCarrito } from '../modelos/EstadoCarrito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos:Producto[];
  private productoCarrito: ProductoCarrito = new ProductoCarrito();
  private carritoStatus: EstadoCarrito = new EstadoCarrito();

  private productoAgregados:any=[];

  constructor(private productoService:ServiceService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.obtenerProductos().subscribe(data=>{
      this.productos = data;
    });
  } 

  alimentarStatus(){
    this.carritoStatus.id = 1;
    this.carritoStatus.estado = "pendiente";
  }

  agregarDatos(producto){
    this.alimentarStatus();     
    this.productoCarrito.producto = producto;
    this.productoCarrito.carrito = this.carritoStatus;
    this.productoCarrito.cantidad = 1;
      
    this.productoAgregados.push(JSON.stringify(producto));

    this.productoService.contador = this.productoAgregados.length;
  }
  
  agregarProductoCarrito(producto){
     this.agregarDatos(producto);
    
     this.productoService.agregarProductoCarrito(this.productoCarrito).subscribe(response=>{
     });
  }

}
