import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CreateRdvPage} from "../create-rdv/create-rdv";
import {RdvListPage} from "../rdv-list/rdv-list";
import {RdvMapPage} from "../rdv-map/rdv-map";


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
      { title: 'New RDV', icon: 'add', component: CreateRdvPage },
      { title: 'RDV map', icon: 'map', component: RdvMapPage },
      { title: 'RDV list', icon: 'list', component: RdvListPage }
    ];
  }

}
