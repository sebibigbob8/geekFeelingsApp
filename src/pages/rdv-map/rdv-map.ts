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
  userMarker: Marker[];
  map: Map;
  username = "";
  myRdvs;
  otherRdvs: CreateRDV[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider,
              private geolocation: Geolocation, private storage: Storage) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = {maxZoom: 18};
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
    };
    this.myRdvs = new Array();

  }

  onMapReady(map: Map) {
    this.map = map;

    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.userMarker = [marker([coords.latitude, coords.longitude]).bindTooltip("Im here")];
      this.map.panTo(latLng(coords.latitude, coords.longitude));
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });

    this.storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      this.http.get(`${config.apiUrl}/users/${this.username}/rdv?username=true`, this.global.httpHeader).subscribe(rdvs => {
        for(let key of Object.keys(rdvs))
        {
          if(typeof rdvs[key].lat != 'undefined' && typeof rdvs[key].long != 'undefined')
          {
            marker([rdvs[key].lat,rdvs[key].long]).bindPopup(rdvs[key].description).addTo(map);
          }

          this.myRdvs.push(rdvs[key]);
        }
        //TODO: Add mutliple marker at once leaflet !
      });
    }).catch(err => console.warn(err))

  }
}
