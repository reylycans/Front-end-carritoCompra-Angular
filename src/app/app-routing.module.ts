import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductosComponent} from './productos/productos.component';
import {CrearproductoComponent} from './productos/crear/crearproducto.component';
import {CarritoComponent} from './productoCarrito/carrito.component';

const routes: Routes = [
  {path: '', redirectTo: '/producto', pathMatch: 'full'},
  {path: 'producto', component: ProductosComponent},
  {path: 'producto/form', component: CrearproductoComponent},
  {path: 'carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
