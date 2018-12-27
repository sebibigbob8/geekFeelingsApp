import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {NgForm} from "@angular/forms";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(NgForm)
  form: NgForm;
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  logOut() {
    this.auth.logOut();
  }
}
