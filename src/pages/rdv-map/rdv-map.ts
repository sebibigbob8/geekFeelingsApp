import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {config} from "../../app/config";
import {Geolocation} from '@ionic-native/geolocation';
import {latLng, MapOptions, tileLayer, marker, Marker, Map} from 'leaflet';
import {CreateRDV} from "../../models/create-rdv";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-rdv-map',
  templateUrl: 'rdv-map.html',
})
export class RdvMapPage {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;
  username = "";
  myRdvs: CreateRDV[];
  otherRdvs: CreateRDV[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider,
              private geolocation: Geolocation, private storage: Storage) {
    storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      this.http.get(`${config.apiUrl}/users/${this.username}/rdv?username=true`, this.global.httpHeader).subscribe(response => {
        console.log(response);
      }, error => console.warn(error));
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = {maxZoom: 18};
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.mapMarkers = [marker([coords.latitude, coords.longitude]).bindTooltip("Im here")];
      this.map.panTo(latLng(coords.latitude, coords.longitude));
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
    };

    this.http.get(`${config.googleMapsApi}chemin+des+libellules+lausanne`).subscribe(response =>{
      console.log('GoogleMap:');
      console.log(response);
    })
  }

}
