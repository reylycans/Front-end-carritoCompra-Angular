import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ProductoCarrito } from '../modelos/productoCarrito';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { EstadoCarrito } from '../modelos/EstadoCarrito';
import Swal from 'sweetalert2';

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
   // this.productoService.obtenerProductosCarrito().subscribe(res=>{
     //  this.productoCarrito = res;
    //});
    const productoCar = localStorage.getItem("productoCart");
    this.productoCarrito = JSON.parse(productoCar);
    console.log(this.productoCarrito);
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


  eliminarProductoCarritoTemporal(producto){
   
    this.productoCarrito = this.productoCarrito.filter(pro=> pro !== producto); 
    localStorage.setItem("productoCart",JSON.stringify(this.productoCarrito));
    
    this.productoService.contador = this.productoCarrito.length;
  }

  guardarProductoCarrito(){
   
    this.productoService.guardarProductoCarrito(this.productoCarrito).subscribe(res=>{
      Swal.fire(
        'Pago',
        'Pago realizado con exito',
        'success'
      )
    });
  }

  eliminarProductoCarrito(producto){

    this.productoService.eliminarProductoCarrito(producto.id).subscribe(response=>{
      this.productoCarrito = this.productoCarrito.filter(pro=> pro !== producto);
      this.productoService.contador = this.productoCarrito.length;
    });
  }
}
