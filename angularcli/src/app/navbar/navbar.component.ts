import { Component, OnInit } from '@angular/core';
import { UsuarioGlobal } from '../UsuarioGlobal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario:string;

  constructor(private usuarioGloblal:UsuarioGlobal) { 
    this.usuario = this.usuarioGloblal.usuario.personas_nombre;
  }

  ngOnInit() {
  }

}
