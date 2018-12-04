import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LibroDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-libro-detalle',
  templateUrl: 'libro-detalle.html',
})
export class LibroDetallePage {

  libro: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.libro = this.navParams.get('libro');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibroDetallePage');
  }

}
