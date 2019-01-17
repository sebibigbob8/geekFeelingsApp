import { Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events} from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import { HttpClient } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
<<<<<<< HEAD
import { config } from '../../app/config';
=======
import { RegisterRequest } from '../../models/register-request';
import {config} from "../../app/config";
>>>>>>> 642f995c923c730d636faeb92e3a993609c1a919

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

  constructor(private http: HttpClient,public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public registerEvent: Events) {

  this.createrdv= new CreateRDV();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RdvListPage');
  }

/**
   * Called when the create-rdv form is submitted.
   */
  async onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();
    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
<<<<<<< HEAD

    const url = `${config.apiUrl}/rdvs`;
    //let url = this.global.urlAPI + "/rdvs";
=======
    const url = `${config.apiUrl}/rdvs`;
    //let url = this.global.urlAPI + "/rdvs";

>>>>>>> 642f995c923c730d636faeb92e3a993609c1a919
    // Hide any previous create rdv error.


    console.log(url);
    this.http.post(url, this.createrdv, this.global.httpHeader).subscribe(rdv => {
      console.log(rdv);
        }, err =>{
          console.error(err);})

      }
    }



