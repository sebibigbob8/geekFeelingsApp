import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RdvListPage} from "../rdv-list/rdv-list";
import {RdvMapPage} from "../rdv-map/rdv-map";
import {ProfilePage} from "../profile/profile";


export interface HomePageTab {
  title: string;
  icon: string;
  component: Function;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabs: HomePageTab[];

  constructor(public navCtrl: NavController) {
    this.tabs = [
      { title: 'Profile', icon: 'add', component: ProfilePage },
      { title: 'RDV Map', icon: 'map', component: RdvMapPage },
      { title: 'My RDV', icon: 'list', component: RdvListPage }
    ];
  }

}
