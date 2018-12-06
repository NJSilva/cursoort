import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiposComponent } from './tipos/tipos.component';
import { PrestamosComponent } from './Prestamos/Prestamos.component';
import { LoginComponent } from './login/login.component';
import { LibrosComponent } from './libros/libros.component';

import { LoginService} from './login.service';
import { LibrosService} from './libros.service';
import { PrestamosService} from './prestamos.service';
import { TiposService} from './tipos.service';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioGlobal } from './UsuarioGlobal';

const rutas : Route[]=[
  {path:'', component: LoginComponent},
  {path:'prestamos' , component: PrestamosComponent},
  {path:'libros', component:LibrosComponent},
  {path:'tipos' , component:TiposComponent},
  {path:'about', component:AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TiposComponent,
    PrestamosComponent,
    LoginComponent,
    LibrosComponent,
    AboutComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [LoginService,LibrosService,PrestamosService,TiposService,UsuarioGlobal],
  bootstrap: [AppComponent]
})
export class AppModule { }
