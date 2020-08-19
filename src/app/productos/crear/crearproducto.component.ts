import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/Productos';
import { ServiceService } from 'src/app/service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {

  producto: Producto = new Producto();

  constructor(private service:ServiceService,private router: Router) { }

  ngOnInit(): void {
  }

  crearProducto(): void{
     this.service.crearProducto(this.producto).subscribe(response=>{
      this.router.navigate(['/producto']);
      Swal.fire(
        'Producto',
        'Registro guardado con exito',
        'success'
      )
     });
  }

}
