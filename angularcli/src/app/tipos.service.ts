import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Tipos } from './Tipos';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  direccion:string = 'http://localhost:9080/BibliotecaORT/webresources/tipo';

  encabezado:HttpHeaders = new HttpHeaders({'Content-Type':'application/json' , "Authorization": "Bearer 2018-cjpb"});

  constructor(private httpClient : HttpClient) { 
    console.log('tiposService funcionando');
  }

  getData(){
      return this.httpClient.get<Tipos[]>(this.direccion ,{ headers:this.encabezado });
  }
}
