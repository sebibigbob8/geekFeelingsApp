import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import * as bcrypt from "bcryptjs";
import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import {User} from "../../models/user";
import {async} from "@angular/core/testing";
import has = Reflect.has;

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

  constructor(private auth: AuthProvider, private navCtrl: NavController) {
    this.authRequest = new AuthRequest();
  }

  /**
   * Called when the login form is submitted.
   */
  async onSubmit($event){

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;
    /* beautiful but useless
    let plainPassword = this.authRequest.password;
    const saltRounds = 10;
    let cryptedRequest = new AuthRequest();
    cryptedRequest.username = this.authRequest.username;

    let hashedpsw = await bcrypt.hash(plainPassword,saltRounds);
    cryptedRequest.password = hashedpsw;
*/
    this.auth.logIn(this.authRequest).subscribe(undefined, err => {
          this.loginError = true;
          console.warn(`Authentication failed: ${err.message}`);
        })
  }



}
