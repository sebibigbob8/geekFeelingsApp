import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import { HttpClient } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { config } from '../../app/config';
import { User } from '../../models/user';
import {Storage} from "@ionic/storage";

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
    auth: any;
    createrdv: CreateRDV;
    user: User;
    username = "";
    rdvs: Object;
    rdvToModify: Object;
    rdv: Object;



  constructor(private http: HttpClient, public global: GlobalProvider, public navCtrl: NavController,
              private storage: Storage, public navParams: NavParams,
              public registerEvent: Events) {

    this.createrdv = new CreateRDV();

    storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      http.get(`${config.apiUrl}/users/${this.username}/rdv?username=true`, this.global.httpHeader).subscribe(response => {
        console.log(response);
        this.rdvs = response;
      }, error => console.warn(error));
    });

  }

  ionViewDidLoad() {

  }

  modifyRdv(rdv){
    this.rdvToModify = rdv;
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
    
    //const url = `${config.apiUrl}/rdvs`;
    //let url = this.global.urlAPI + "/rdvs";

    this.http.get(`${config.apiUrl}/address/${this.createrdv.city}+${this.createrdv.location}`, this.global.httpHeader).subscribe(location => {
      console.log("Reponse google Map", location);
      this.createrdv.lat = location[0].latitude;
      this.createrdv.long = location[0].longitude;
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



