import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {config} from "../../app/config";
import {Geolocation} from '@ionic-native/geolocation';
import {latLng, MapOptions, tileLayer, marker, Marker, Map} from 'leaflet';
import { RdvListPage } from '../rdv-list/rdv-list';

@Component({
  selector: 'page-rdv-map',
  templateUrl: 'rdv-map.html',
})

export class RdvMapPage {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;
  rdvList = RdvListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider, private geolocation: Geolocation) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = {maxZoom: 18};
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ionViewDidLoad() {
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.mapMarkers = [marker([coords.latitude, coords.longitude]).bindTooltip("Im here")];
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
  }
}
