import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CreateRDV} from "../../models/create-rdv";
import {config} from "../../app/config";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {RdvListPage} from "../rdv-list/rdv-list";

/**
 * Generated class for the UpdateRdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-rdv',
  templateUrl: 'update-rdv.html',
})
export class UpdateRdvPage {
  createrdv: CreateRDV;
  @ViewChild(NgForm)
  form: NgForm;
  rdvToModify;
  rdvListPage = RdvListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider) {
    this.createrdv = new CreateRDV();
    this.rdvToModify = navParams.get("rdvToModify");
    console.log(this.rdvToModify);
    this.createrdv.purposeTitle = this.rdvToModify.purposeTitle;
    this.createrdv.description = this.rdvToModify.description;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateRdvPage');
  }

  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();
    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    this.http.patch(`${config.apiUrl}/rdvs/${this.rdvToModify._id}`, this.createrdv, this.global.httpHeader).subscribe(rdvUpdated => {
     console.log("El nuevoRDV",rdvUpdated);
      this.navCtrl.setRoot(this.rdvListPage);
    }, err => {
      console.error(err);
    });

  }

}
