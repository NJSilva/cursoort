import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import {Prestamo} from './Prestamo';
import { UsuarioGlobal } from './UsuarioGlobal';
import { Libro } from './Libro';


@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private direccionRest: string;
  private data:any ;

  encabezado:HttpHeaders = new HttpHeaders({'Content-Type':'application/json' , "Authorization": "Bearer 2018-cjpb"});

  constructor(private httpClient : HttpClient , private UG:UsuarioGlobal) { 
    console.log('prestamoService funcionando');
  }

  getData(){
      this.direccionRest = this.UG.direccion + 'prestamo?cedula='+this.UG.usuario.personas_cedula;
      return this.httpClient.get<Prestamo[]>(this.direccionRest ,{ headers:this.encabezado });
  }
  

  postData(unlibro:Libro){
    this.direccionRest = this.UG.direccion +  'prestamo';
    this.data = '{\"prestamos_fecha_desde\": \"' + this.UG.fechaHoy() + '\", \"personas\": { \"personas_id\": ' + this.UG.usuario.personas_id + '},\"libros\":{\"libros_id\":' + unlibro.libros_id + '}}';
    console.log(this.data);
    return this.httpClient.post(this.direccionRest, this.data , { headers: this.UG.encabezados });
  }

  putData(unPrestamo:Prestamo){
    this.direccionRest = this.UG.direccion +  'prestamo';
    this.data='{\"prestamos_fecha_desde\": \"' + unPrestamo.prestamos_fecha_desde_string + '\", \"prestamos_fecha_hasta\": \"' + this.UG.fechaHoy() + '\", \"personas\": { \"personas_id\": ' +this.UG.usuario.personas_id + '},\"libros\":{\"libros_id\":' + unPrestamo.libros.libros_id + '}}';
    console.log(this.data);
    return this.httpClient.put(this.direccionRest, this.data , { headers: this.UG.encabezados });
  }
}
