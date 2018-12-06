import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from './usuario';

@Injectable()
export class UsuarioGlobal {
  usuario= new Usuario;

  direccion: string = 'http://localhost:9080/BibliotecaORT/webresources/';

  encabezados: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer 2018-cjpb" });


  constructor(){
      this.usuario.personas_cedula='19716428';
      this.usuario.personas_id=1;
      this.usuario.personas_mail='njsilva@gmail.com';
      this.usuario.personas_nombre='Nicolas Silva';
  }

  fechaHoy() {

    // Para retornar la fecha del dia en format yyyy-mm-dd
    var fechaHoy = new Date();
    var dd = fechaHoy.getDate() + 1;
    var ddstring:string;
    var mm = fechaHoy.getMonth() + 1; //January is 0!
    var mmstring:string;
    var yyyy = fechaHoy.getFullYear();

    if (dd < 10) {
      ddstring = '0' + dd
    } else {
      ddstring = dd.toString();
    }

    if (mm < 10) {
      mmstring = '0' + mm
    } else {
      mmstring=mm.toString();
    }

    var today = yyyy + '-' + mmstring + '-' + ddstring;

    return today;
  }
}