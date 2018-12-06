import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Libro} from './Libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

 direccion:string = 'http://localhost:9080/BibliotecaORT/webresources/libro';

  encabezado:HttpHeaders = new HttpHeaders({'Content-Type':'application/json' , "Authorization": "Bearer 2018-cjpb"});

  constructor(private httpClient : HttpClient) { 
    console.log('librosService funcionando');
  }

  getData(){
      return this.httpClient.get<Libro[]>(this.direccion ,{ headers:this.encabezado });
  }
}
