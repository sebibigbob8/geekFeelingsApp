import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {Storage} from "@ionic/storage";
import {ProfileRequest} from "../../models/profile-request";

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
  items = [];
  profileRequest: ProfileRequest;
  username = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private http: HttpClient, public global: GlobalProvider, private storage: Storage) {
    storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      http.get(global.urlAPI + `/users/${this.username}?username=true`, this.global.httpHeader).subscribe(response => {
        this.items = response[0].tag;
      }, error => console.warn(error))
    });
    this.profileRequest = new ProfileRequest();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  //TODO: Do the submit process, the API do not provide tag on patch route, check if the patch route is available with username instead of id
  onSubmit($event) {
    // Prevent default HTML form behavior.
    $event.preventDefault();
    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    this.profileRequest.tag = this.items;

    let url = this.global.urlAPI + `/users/${this.username}?username=true`;
    this.http.patch(url, this.profileRequest, this.global.httpHeader).subscribe(user => {
      console.log(user);
    }, err => {
      console.log('Registration failed:' + err.message);
    });


  }

  logOut() {
    this.auth.logOut();
  }

  showItems() {
    console.log(this.items);
  }
}
