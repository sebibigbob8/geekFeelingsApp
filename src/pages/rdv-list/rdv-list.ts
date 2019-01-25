import {Component, ViewChild} from '@angular/core';
import {NgForm, FormGroup, FormBuilder} from '@angular/forms';
import {Events} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import {HttpClient} from '@angular/common/http';
import {GlobalProvider} from '../../providers/global/global';
import {config} from '../../app/config';
import {User} from '../../models/user';
import {Storage} from "@ionic/storage";
import {UpdateRdvPage} from "../update-rdv/update-rdv";

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
  updateRdvPage = UpdateRdvPage;

  @ViewChild(NgForm)
  form: NgForm;
  auth: any;
  createrdv: CreateRDV;
  user: User;
  username = "";
  rdvs: Object;
  rdvToModify: any;
  rdv: CreateRDV[];


  constructor(private http: HttpClient, public global: GlobalProvider, public navCtrl: NavController,
              private storage: Storage, public navParams: NavParams,
              public registerEvent: Events) {

    this.createrdv = new CreateRDV();
    this.rdvToModify = null;
    storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      http.get(`${config.apiUrl}/users/${this.username}/rdv?username=true`, this.global.httpHeader).subscribe(response => {
        console.log(response);
        this.rdvs = response;
      }, error => console.warn(error));
    });


  }

  goUpdate(rdv) {
    this.navCtrl.push(this.updateRdvPage, {
      rdvToModify: rdv,
    });
  }

    modifyRdv(rdv)
    {
      console.log("dans la fct modify");
      this.rdvToModify = rdv;
      console.log("Le rendez-vous qu'on récupère dans la fonction modify", this.rdvToModify); //Ca marche
    }

    delete (rdv)
    {
      this.http.delete(`${config.apiUrl}/rdvs/${rdv._id}`).subscribe(deletedRdv => {
        console.log(rdv);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }, error1 => {
        console.error(error1);
      });
    }
    ;


    /**
     * Called when the create-rdv form is submitted.
     */
    onSubmit($event)
    {
      // Prevent default HTML form behavior.
      $event.preventDefault();
      // Do not do anything if the form is invalid.
      if (this.form.invalid) {
        return;
      }
      this.http.get(`${config.apiUrl}/address/${this.createrdv.city}+${this.createrdv.location}`, this.global.httpHeader).subscribe(location => {
        console.log("Reponse google Map", location);
        this.createrdv.lat = location[0].latitude;
        this.createrdv.long = location[0].longitude;
        this.http.post(url, this.createrdv, this.global.httpHeader).subscribe(rdv => {
          console.log('rdv created', rdv);
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }, err => {
          console.error(err);
          return err;
        })
      }, err => {
        console.error(err);
        return err;
      });
      const url = `${config.apiUrl}/rdvs`;
      // Hide any previous create rdv error.

    }

  }



