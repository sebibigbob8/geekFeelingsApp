import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegisterRequest} from "../../models/register-request";
import {NgForm} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

  constructor(private http: HttpClient, public global:GlobalProvider,public navCtrl: NavController) {

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
    //this.backendMessage = new HttpErrorResponse();
    let url = this.global.urlAPI + "/users";

    await this.http.post(url, this.registerRequest, this.global.httpHeader).subscribe(user => console.log(user), err => {
      this.registerError = true;
      let html = document.createElement('div');
      html.innerHTML = err.error;
      this.backendMessage = html.getElementsByTagName("h1")[0].textContent;
      console.warn('Registration failed:' + err.message);
      //this.navCtrl.push(this.loginPage);
    });
  }
}
