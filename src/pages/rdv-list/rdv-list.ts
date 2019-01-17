import { Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events} from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import { HttpClient } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { RegisterRequest } from '../../models/register-request';
import { config } from '../../app/config';

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
    const url = `${config.apiUrl}/rdvs`;
    //let url = this.global.urlAPI + "/rdvs";
    // Hide any previous create rdv error.
    console.log(url);
    this.http.post(url, this.createrdv, this.global.httpHeader).subscribe(rdv => {
      console.log(rdv);
      console.log("123456789")
      console.log(this.auth.getuser());
        }, err =>{
          console.error(err);})

      }
    }



