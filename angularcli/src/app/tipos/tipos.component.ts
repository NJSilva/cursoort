import { Component, OnInit } from '@angular/core';
import {TiposService} from '../tipos.service';

import { Tipos } from '../Tipos';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {

  tipos : Tipos[];

  constructor(private tiposService:TiposService) { 
    tiposService.getData().subscribe(data => {
      this.tipos = data;
    });
  }

  ngOnInit() {
  }

}
