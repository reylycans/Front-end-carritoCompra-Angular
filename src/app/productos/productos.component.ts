import { Component, OnInit, ɵConsole } from '@angular/core';
import { Producto } from '../modelos/Productos';
import {ServiceService} from '../service.service';
import { ProductoCarrito } from '../modelos/productoCarrito';
import { EstadoCarrito } from '../modelos/EstadoCarrito';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos:Producto[];
  
  private carritoStatus: EstadoCarrito = new EstadoCarrito();
  private productoCarrito: ProductoCarrito;
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

  verificarProductosCarrito(){
    if(localStorage.getItem("productoCart")!= undefined && this.productoAgregados.length==0){
      this.productoAgregados = JSON.parse(localStorage.getItem("productoCart"));
    }
  }

  agregarDatos(producto){
    this.productoCarrito = new ProductoCarrito();
    this.verificarProductosCarrito();
    this.alimentarStatus();    
    this.productoCarrito.producto = producto;
    this.productoCarrito.carrito = this.carritoStatus;
    this.productoCarrito.cantidad = 1;

    this.productoAgregados = this.productoAgregados.concat(this.productoCarrito); 
    localStorage.setItem("productoCart", JSON.stringify(this.productoAgregados));
    this.productoService.contador = this.productoAgregados.length;
  }
  
  agregarProductoCarrito(producto){
    this.agregarDatos(producto);
  }

}
