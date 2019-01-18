import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import {HttpClient} from '@angular/common/http';
import {GlobalProvider} from '../../providers/global/global';
import {config} from '../../app/config';

/**
 * Generated class for the RdvListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rdv-list',
  templateUrl: 'rdv-list.html',
})
export class RdvListPage {


  /**
   * If true, it means that one of the inputs doesn't fit the restrictions
   */
  createRdvError: boolean;

  @ViewChild(NgForm)
  form: NgForm;
  createrdv: CreateRDV;
  auth: any;

  constructor(private http: HttpClient, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public registerEvent: Events) {
    this.createrdv = new CreateRDV();
  }

  ionViewDidLoad() {

  }

  /**
   * Called when the create-rdv form is submitted.
   */
  onSubmit($event) {
    // Prevent default HTML form behavior.
    $event.preventDefault();
    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    this.http.get(`${config.apiUrl}/address/${this.createrdv.city}+${this.createrdv.location}`, this.global.httpHeader).subscribe(location => {
      console.log("Reponse google Map", location);
      console.log(location[0].latitude);
      this.createrdv.lat = location[0].latitude;
      this.createrdv.long = location[0].lontitude;
      this.http.post(url, this.createrdv, this.global.httpHeader).subscribe(rdv => {
        console.log('rdv created', rdv);
      }, err => {
        console.error(err);
        return err;
      })
    }, err => {
      console.error(err);
      return err;
    });
    const url = `${config.apiUrl}/rdvs`;
    // Hide any previous create rdv error.

  }

}



