import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders  } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer 2018-cjpb'
  })
};


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  libros: Observable<any>;

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.libros = this.httpClient.get('http://localhost:9080/BibliotecaORT/webresources/libro',httpOptions);
    this.libros
      .subscribe(data => {
        console.log('my data: ', data);
      })
  }

  openDetails(libro) {
    this.navCtrl.push('LibroDetallePage', {libro: libro});
  }
}
