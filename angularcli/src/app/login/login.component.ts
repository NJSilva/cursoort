import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() usuario:string;
  @Input() clave:string;

  constructor(private loginService:LoginService , private router:Router) { }

  ngOnInit() {
  }

  onClickMeLogin(){
    this.loginService.postData(this.usuario , this.clave).subscribe(data=>{
      if(data.length!=0){
        console.log(data);
        this.router.navigateByUrl('/prestamos');
      } else {
        console.log('No hay datos');
      }
    });
  }

}
