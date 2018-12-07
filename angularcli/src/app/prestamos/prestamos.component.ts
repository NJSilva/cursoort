import { Component, OnInit } from '@angular/core';

import { Prestamo } from '../Prestamo';
import { PrestamosService } from '../prestamos.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
    selector: 'app-Prestamos',
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

     prestamos: Prestamo[];
     unPrestamo: Prestamo;
     mensaje: string = 'mensaje';

    constructor(private prestamosService: PrestamosService, private confirmationDialogService: ConfirmationDialogService) {
        prestamosService.getData().subscribe(data => {
            this.prestamos = data;
        });
    }

    ngOnInit(){}

    onClickMePrestamo(_prestamo:Prestamo) {
        this.unPrestamo = _prestamo;
        this.mensaje = '¿Desea devolver el libro ' + this.unPrestamo.libros.libros_titulo + ' ?';

        this.confirmationDialogService.confirm('Confirme', this.mensaje)
        .then((confirmed) => confirmed?this.devolver():console.log('cancelado'))
        .catch(() => console.log('User dismissed the dialog'));
      
    }

    devolver() {
        console.log('en devolver' + this.unPrestamo.libros.libros_id);
        this.prestamosService.putData(this.unPrestamo).subscribe(data => {
            console.log(data);
        });
    }

}
