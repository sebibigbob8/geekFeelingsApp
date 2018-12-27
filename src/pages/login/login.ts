import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events, NavController} from 'ionic-angular';
import {AuthRequest} from '../../models/auth-request';
import {AuthProvider} from '../../providers/auth/auth';
import {RegisterPage} from '../register/register';

/**
 * Login page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;
  registerPage = RegisterPage;
  comeFromRegister: string;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;
  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(private auth: AuthProvider, private navCtrl: NavController, public registerEvent: Events) {
    this.authRequest = new AuthRequest();
    this.comeFromRegister = "hidden";
    this.registerEvent.subscribe('registration', data => {
      if (data) {
        console.log("registration event");
        this.comeFromRegister = "visible";
      }

    })
  }

  /**
   * Called when the login form is submitted.
   */
  async onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    // Hide any previous login error.
    this.loginError = false;

    this.auth.logIn(this.authRequest).subscribe(undefined, err => {
      this.loginError = true;
      console.warn(`Authentication failed: ${err.message}`);
    })
  }
}
