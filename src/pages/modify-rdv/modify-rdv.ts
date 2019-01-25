import { RdvService } from './../RdvService';
import { RdvListPage } from './../rdv-list/rdv-list';
import { NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Events} from 'ionic-angular';
import {CreateRDV} from '../../models/create-rdv';
import { HttpClient } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { config } from '../../app/config';
import { User } from '../../models/user';
import {Storage} from "@ionic/storage";
import { Subscription } from 'rxjs';


/**
 * Generated class for the ModifyRdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify-rdv',
  templateUrl: 'modify-rdv.html',
})
export class ModifyRdvPage implements OnInit, OnDestroy{

  createrdv: CreateRDV;
  rdvsSubscription: Subscription;
  RdvsListPage: any;
  RdvService: any;
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

    /**
  * If true, it means that one of the inputs doesn't fit the restrictions
  */
 createRdvError: boolean;


 @ViewChild(NgForm)
   form: NgForm;
   auth: any;
   user: User;
   username = "";
   rdvs: Object;
   rdvToModify: CreateRDV;
   rdv : any;
  rdvListPage: RdvListPage;



  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider,
              private http: HttpClient, public registerEvent: Events) {

                console.log("Je me construis 2");

                console.log(this.rdvToModify);
  }


  ngOnInit() {
    this.rdvsSubscription = this.RdvService.rdvSubject.subscribe(
      (rdvSelected: CreateRDV) => {
        this.rdvToModify = rdvSelected;
        console.log("Je me construis");
        console.log(this.rdvToModify);
      }
    );
    this.RdvService.emitRdv();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyRdvPage');
  }


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
        }, err =>{
          console.error(err);})

  }
}
