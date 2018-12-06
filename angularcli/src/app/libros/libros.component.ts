import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../libros.service';

import { Libro} from './Libro';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros : Libro[];

  constructor(private librosService:LibrosService) { 
    librosService.getData().subscribe(data => {
      this.libros = data;
    });
  }

  ngOnInit() {
  }

}
