import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import {Prestamo} from './Prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  direccion:string = 'http://localhost:9080/BibliotecaORT/webresources/prestamo';

  encabezado:HttpHeaders = new HttpHeaders({'Content-Type':'application/json' , "Authorization": "Bearer 2018-cjpb"});

  constructor(private httpClient : HttpClient) { 
    console.log('prestamoService funcionando');
  }

  getData(){
      return this.httpClient.get<Prestamo[]>(this.direccion ,{ headers:this.encabezado });
  }
}
