import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../login.service';
import { UsuarioGlobal } from '../UsuarioGlobal';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() user:string;
  @Input() clave:string;

  usuario:Usuario;

  constructor(private loginService:LoginService , private router:Router , private usuarioGlobal:UsuarioGlobal) { }

  ngOnInit() {
  }

  onClickMeLogin(){
    this.loginService.postData(this.user , this.clave).subscribe(data=>{
      if(data.length!=0){

        this.usuarioGlobal.usuario.personas_cedula=data['personas_cedula'];
        this.usuarioGlobal.usuario.personas_id=data['personas_id'];
        this.usuarioGlobal.usuario.personas_mail=data['personas_mail'];
        this.usuarioGlobal.usuario.personas_nombre=data['personas_nombre'];

        console.log(this.usuarioGlobal.usuario);

        this.router.navigateByUrl('/prestamos');
      } else {
        console.log('No hay datos');
      }
    });
  }

}
