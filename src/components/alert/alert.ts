import { Component } from '@angular/core';
import {AlertController} from "ionic-angular";

/**
 * Generated class for the AlertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alert',
  templateUrl: 'alert.html'
})
export class AlertComponent {


  constructor(public alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
