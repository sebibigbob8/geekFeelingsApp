import { RdvListPage } from '../rdv-list/rdv-list';
import { CreateRDV } from '../../models/create-rdv';
import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRdvPage');
  }
  logOut() {
    this.auth.logOut();
  }

}
