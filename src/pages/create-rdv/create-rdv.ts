import { RdvListPage } from '../rdv-list/rdv-list';
import { CreateRDV } from '../../models/create-rdv';
import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { config } from '../../app/config';
import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the CreateRdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-rdv',
  templateUrl: 'create-rdv.html'


})
export class CreateRdvPage {

  rdv: any[];
  rdvs: any;
  http: any;
  global: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthProvider) {

    const url = `${config.apiUrl}/rdvs`;



    this.http.get(url, this.global.httpHeader).subscribe(rdv => {
      console.log(rdv);
    }, err => {
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRdvPage');
  }
  logOut() {
    this.auth.logOut();
  }

}
