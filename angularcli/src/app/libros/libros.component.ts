import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../libros.service';

import { Libro} from '../Libro';
import { PrestamosService } from '../Prestamos.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros : Libro[];
  unLibro : Libro;
  mensaje:string='mensaje';

  constructor(private librosService:LibrosService , private prestamosService:PrestamosService) { 
    librosService.getData().subscribe(data => {
      this.libros = data;
    });
  }

  ngOnInit() {
  }

  onClickMe(_libro:Libro){
    
    this.unLibro=_libro;

    this.mensaje='¿Desea reservar el libro ' + this.unLibro.libros_titulo + ' ?';
  }

  reservar(){ 
    console.log('en reserva' + this.unLibro.libros_id);
    this.prestamosService.postData(this.unLibro).subscribe();
  }


} // fin clase
