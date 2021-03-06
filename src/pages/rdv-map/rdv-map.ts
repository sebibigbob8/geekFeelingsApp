import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {Geolocation} from '@ionic-native/geolocation';
import {
  latLng,
  MapOptions,
  tileLayer,
  marker,
  Marker,
  Map,
  icon,
  popup,
  DomUtil,
  DomEvent,
  LayerGroup,
  control
} from 'leaflet';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from "@angular/platform-browser";
import RdvListPage from "../rdv-list/rdv-list";
import { config } from '../../app/config';


@Component({
  selector: 'page-rdv-map',
  templateUrl: 'rdv-map.html',
})

export class RdvMapPage {
  mapOptions: MapOptions;
  userMarker: Marker[];
  map: Map;
  username = "";
  markers;
  myRdvs;
  otherRdvs;
  guestRdvs;
  layerMyRdvs = new LayerGroup();
  layerOtherRdvs = new LayerGroup();
  layerGuestRdvs = new LayerGroup();
  filtersControl = {};
  rdvListePage = RdvListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider,
              private geolocation: Geolocation, private storage: Storage, private sanitizer: DomSanitizer) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = {maxZoom: 18};
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: [46.53009,6.63599 ] //default
    };
    this.myRdvs = new Array();
    this.otherRdvs = new Array();
    this.guestRdvs = new Array();
    this.markers = {};
  }

  async onMapReady(map: Map) {
    this.map = map;

    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log(`Map moved to ${center.lng}, ${center.lat}`);
    });
    //Get the user's location
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.userMarker = [marker([coords.latitude, coords.longitude]).bindTooltip("Im here")];
      this.map.panTo(latLng(coords.latitude, coords.longitude));
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
    //Draw the user RDVS--------------
    await this.storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      this.http.get(`${config.apiUrl}/users/${this.username}/rdv?username=true`, this.global.httpHeader).subscribe(rdvs => {
        this.putRdvOnMap(rdvs, this.myRdvs);
        for (let rdv of this.myRdvs) {
          var form = document.createElement('div');
          //TODO: list all guests
          //TODO @AKaufi : styling
          form.innerHTML = `
                <form id="${rdv.id}" >
                    <span >${rdv.title}</span>
                </form>
            `;
          document.getElementById("myRdvsForms").appendChild(form);
          this.layerMyRdvs.addLayer(this.createmarker(rdv, myRdvIcon));
        }

        this.filtersControl['Mine'] = this.layerMyRdvs;
      }, err => {
        console.error(err);
      });
    }).catch(err => console.warn(err))
    //Draw the others RDVS------------
    await this.http.get(`${config.apiUrl}/rdvs?notmine=true`, this.global.httpHeader).subscribe(rdvs => {
      this.putRdvOnMap(rdvs, this.otherRdvs);
      for (let rdv of this.otherRdvs) {
        var form = document.createElement('div');
        //TODO @AKaufi : styling
        form.innerHTML = this.sanitizer.bypassSecurityTrustHtml(`
                <form class="popupForm" id="${rdv.id}" >
                    <span >${rdv.title}</span>
                    <span>${rdv.id}</span>
                    <button type="button">Sign Up </button>
                </form>
            `).toString();
        document.getElementById("myRdvsForms").appendChild(form);
        document.getElementById(rdv.id).addEventListener('click', (theOne) => {
          //1.make the API call to sign up to the event 2. Verification : Already on it ?If yes, how to disable the signUp BTN
          let idRdv = theOne['path'][1].id;

          this.http.patch(`${config.apiUrl}/rdvs/${idRdv}`, {guest: true}, this.global.httpHeader).subscribe(rdvUpdated => {
            //TODO: Message d'inscription
            console.log("The new Rdv :", rdvUpdated);
            theOne.target['disabled'] = true;
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }, err => {
            console.error(err);
          })
        });
        this.layerOtherRdvs.addLayer(this.createmarker(rdv, otherRdvIcon));
      }
      this.map.addLayer(this.layerOtherRdvs);
      this.filtersControl['Others'] = this.layerOtherRdvs;

    }, err => {
      console.error(err);
    });
    //Draw the guests RDVS------------
    await this.http.get(`${config.apiUrl}/rdvs?guest=true`, this.global.httpHeader).subscribe(rdvs => {
      this.putRdvOnMap(rdvs, this.guestRdvs);
      for (let rdv of this.guestRdvs) {
        var form = document.createElement('div');
        //TODO @AKaufi : styling
        form.innerHTML = this.sanitizer.bypassSecurityTrustHtml(`
                <form class="popupForm" id="${rdv.id}" >
                    <span >${rdv.title}</span>
                    <span>${rdv.id}</span>
                    <button type="button">Unsubscribe </button>
                </form>
            `).toString();
        document.getElementById("myRdvsForms").appendChild(form);
        document.getElementById(rdv.id).addEventListener('click', (theOne) => {
          //1.make the API call to sign up to the event 2. Verification : Already on it ?If yes, how to disable the signUp BTN
          let idRdv = theOne['path'][1].id;

          this.http.patch(`${config.apiUrl}/rdvs/${idRdv}`, {guest: false}, this.global.httpHeader).subscribe(rdvUpdated => {
            //TODO: Message de désinscription
            console.log("The new Rdv :", rdvUpdated);
            theOne.target['disabled'] = true;
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }, err => {
            console.error(err);
          })
        });
        //this.markers = this.createmarker(rdv, guestIcon);
        this.layerGuestRdvs.addLayer(this.createmarker(rdv, guestIcon));
      }
      this.map.addLayer(this.layerGuestRdvs);
      this.filtersControl['Guest'] = this.layerGuestRdvs;
      control.layers(null, this.filtersControl).addTo(this.map);

    }, err => {
      console.error(err);
    });
  }

  /**
   * Draw markers on map
   * Save datas about events in an array at the same position.
   * rdvs[x] = markers{x+1}
   * @param rdvs
   * @param icon
   */
  putRdvOnMap(rdvs, rdvTable) {
    for (let key of Object.keys(rdvs)) {
      let rdv = rdvs[key];
      if (typeof rdv.lat === 'undefined' || typeof rdv.long === 'undefined')
        continue;
      rdvTable.push({
        id: rdv._id,
        title: rdv.purposeTitle,
        date: rdv.date,
        description: rdv.description,
        lat: rdv.lat,
        long: rdv.long
      });
    }
  }

  createmarker(LErdv, icon) {
    return marker([LErdv.lat, LErdv.long], {icon: icon}).bindPopup(document.getElementById(LErdv.id));
  }
}

//TODO @AKaufi : styling
var otherRdvIcon = icon({
  iconUrl: './assets/imgs/marker2.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var myRdvIcon = icon({
  iconUrl: './assets/imgs/place-localizer.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var guestIcon = icon({
  iconUrl: './assets/imgs/marker.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

