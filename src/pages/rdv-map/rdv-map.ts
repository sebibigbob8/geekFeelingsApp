import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";

/**
 * Generated class for the RdvMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rdv-map',
  templateUrl: 'rdv-map.html',
})
export class RdvMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    // TODO: make an HTTP request to retrieve the trips.
    const url = this.global.urlAPI+"/users";
    this.http.get(url,this.global.httpHeader).subscribe(users => {
      console.log(`users loaded`, users);
    });
  }

}
