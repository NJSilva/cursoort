import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../libros.service';

import { Libro } from '../Libro';
import { PrestamosService } from '../prestamos.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: Libro[];
  unLibro: Libro;
  mensaje: string = 'mensaje';

  constructor(private librosService: LibrosService,
    private prestamosService: PrestamosService,
    private confirmationDialogService: ConfirmationDialogService) {

    librosService.getData().subscribe(data => {
      this.libros = data;
    });

  }

  ngOnInit() {
  }

  onClickMeReserva(_libro: Libro) {

    this.unLibro = _libro;

    this.mensaje = '¿Desea reservar el libro ' + this.unLibro.libros_titulo + ' ?';

    this.confirmationDialogService.confirm('Confirme', this.mensaje)
      .then((confirmed) => confirmed ? this.reservar() : console.log('cancelado'))
      .catch(() => console.log('User dismissed the dialog'));



  }

  reservar() {
    console.log('en reserva' + this.unLibro.libros_id);
    this.prestamosService.postData(this.unLibro).subscribe();
  }

} // fin clase
