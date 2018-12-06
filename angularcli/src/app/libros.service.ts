import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Libro } from './Libro';
import { UsuarioGlobal} from './UsuarioGlobal';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private direccionRest: string;
  private data:any ;

  constructor(private httpClient: HttpClient , private usuarioGlobal:UsuarioGlobal) {
    console.log('librosService funcionando');
  }

  getData() {
    this.direccionRest = this.usuarioGlobal.direccion +  'libro';
    return this.httpClient.get<Libro[]>( this.direccionRest, { headers: this.usuarioGlobal.encabezados });
  }


}
