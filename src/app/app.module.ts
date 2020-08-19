import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './header/encabezado.component';
import { ProductosComponent } from './productos/productos.component';
import {HttpClientModule} from '@angular/common/http';
import { CrearproductoComponent } from './productos/crear/crearproducto.component';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoComponent } from './productoCarrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    ProductosComponent,
    CrearproductoComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
