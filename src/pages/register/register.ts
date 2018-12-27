import {Component, ViewChild} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegisterRequest} from "../../models/register-request";
import {NgForm} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loginPage = LoginPage;
  registerRequest: RegisterRequest;
  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  registerError: boolean;
  backendMessage: string;

  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(private http: HttpClient, public global: GlobalProvider, public navCtrl: NavController, public registerEvent: Events) {

    this.registerRequest = new RegisterRequest;
  }

  async onSubmit($event) {
    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    // Hide any previous login error.
    this.registerError = false;
    this.backendMessage = "";
    let url = this.global.urlAPI + "/users";

    await this.http.post(url, this.registerRequest, this.global.httpHeader).subscribe(user => {
      this.registerEvent.publish('registration',true);
      this.navCtrl.push(this.loginPage);
    }, err => {
      this.registerError = true;
      //Get the proper backend message
      let html = document.createElement('div');
      html.innerHTML = err.error;
      if(html.getElementsByTagName("h1")[0])
        this.backendMessage = html.getElementsByTagName("h1")[0].textContent;
      console.log('Registration failed:' + err.message);
    });
  }
}
