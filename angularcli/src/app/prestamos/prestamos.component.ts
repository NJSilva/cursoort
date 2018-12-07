import { Component, OnInit } from '@angular/core';

import { Prestamo } from '../Prestamo';
import { PrestamosService } from '../prestamos.service';

@Component({
    selector: 'app-Prestamos',
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

     prestamos: Prestamo[];
     unPrestamo: Prestamo;
     mensaje: string = 'mensaje';

    constructor(private prestamosService: PrestamosService) {
        prestamosService.getData().subscribe(data => {
            this.prestamos = data;
        });
    }

    ngOnInit(){}

    onClickMePrestamo(_prestamo:Prestamo) {
        this.unPrestamo = _prestamo;
        this.mensaje = '¿Desea devolver el libro ' + this.unPrestamo.libros.libros_titulo + ' ?';
    }

    devolver(_this) {
        console.log(_this);
        console.log('en devolver' + this.unPrestamo.libros.libros_id);
        this.prestamosService.putData(this.unPrestamo).subscribe(data => {
            console.log(data);
        });
        
        console.log(document.getElementById('exampleModalCenter'));

        document.getElementById('exampleModalCenter').setAttribute('data-dismiss','modal');
 
    }

}
