import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Prestamo } from './Prestamo';
import { UsuarioGlobal } from './UsuarioGlobal';
import { Libro } from './Libro';
 

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  direccionRest: string;
  data:any ;

  constructor(private httpClient : HttpClient , private usuarioGlobal:UsuarioGlobal) { 
    console.log('prestamoService funcionando');
  }

  getData(){
      this.direccionRest = this.usuarioGlobal.direccion + 'prestamo?cedula='+this.usuarioGlobal.usuario.personas_cedula;
      return this.httpClient.get<Prestamo[]>(this.direccionRest ,{ headers:this.usuarioGlobal.encabezados });
  }
  

  postData(unlibro:Libro){
    this.direccionRest = this.usuarioGlobal.direccion +  'prestamo';
    this.data = '{\"prestamos_fecha_desde\": \"' + this.usuarioGlobal.fechaHoy() + '\", \"personas\": { \"personas_id\": ' + this.usuarioGlobal.usuario.personas_id + '},\"libros\":{\"libros_id\":' + unlibro.libros_id + '}}';
    console.log(this.data);
    return this.httpClient.post(this.direccionRest, this.data , { headers: this.usuarioGlobal.encabezados });
  }

  putData(unPrestamo:Prestamo){
    this.direccionRest = this.usuarioGlobal.direccion +  'prestamo';
    this.data='{\"prestamos_fecha_desde\": \"' + unPrestamo.prestamos_fecha_desde_string + '\", \"prestamos_fecha_hasta\": \"' + this.usuarioGlobal.fechaHoy() + '\", \"personas\": { \"personas_id\": ' +this.usuarioGlobal.usuario.personas_id + '},\"libros\":{\"libros_id\":' + unPrestamo.libros.libros_id + '}}';
    console.log(this.data);
    return this.httpClient.put(this.direccionRest, this.data , { headers: this.usuarioGlobal.encabezados });
  }
}
