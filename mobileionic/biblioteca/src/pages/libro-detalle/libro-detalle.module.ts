import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibroDetallePage } from './libro-detalle';

@NgModule({
  declarations: [
    LibroDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(LibroDetallePage),
  ],
})
export class LibroDetallePageModule {}
