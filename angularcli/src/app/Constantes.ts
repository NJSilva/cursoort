import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

export class Constantes {

  constructor() {

   }

   direccion:string = 'http://localhost:9080/BibliotecaORT/webresources/';

   encabezado:HttpHeaders = new HttpHeaders({'Content-Type':'application/json' , "Authorization": "Bearer 2018-cjpb"});
 
}