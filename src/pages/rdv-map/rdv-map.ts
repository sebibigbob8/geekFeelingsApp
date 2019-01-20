import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {config} from "../../app/config";
import {Geolocation} from '@ionic-native/geolocation';
import {latLng, MapOptions, tileLayer, marker, Marker, Map, icon, popup, DomUtil, DomEvent} from 'leaflet';
import {CreateRDV} from "../../models/create-rdv";
import {Storage} from "@ionic/storage";
import {createScope} from "@angular/core/src/profile/wtf_impl";
import {DomSanitizer} from "@angular/platform-browser";

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
  markers;
  otherRdvs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public global: GlobalProvider,
              private geolocation: Geolocation, private storage: Storage,private sanitizer:DomSanitizer) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = {maxZoom: 18};
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
    };
    this.myRdvs = new Array();
    this.otherRdvs = new Array();
    this.markers = {};
  }

  onMapReady(map: Map) {
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
    //Draw markers about the currently loged in User RDVS
    this.storage.get('username').then((usernameGet) => {
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
                    <span>TODO: guest</span>
                </form>
            `;
          document.getElementById("myRdvsForms").appendChild(form);
          this.markers = this.createmarker(rdv, myRdvIcon);
        }
      });
    }).catch(err => console.warn(err))
    //Draw the others RDVS
    this.http.get(`${config.apiUrl}/rdvs?notmine=true`, this.global.httpHeader).subscribe(rdvs => {
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
        document.getElementById(rdv.id).addEventListener('click',(theOne)=>{
          //TODO: The code detect the correct rdv and the correct click. The ID of the event is in theOne
          //1.make the API call to sign up to the event 2. Verification : Already on it ?If yes, how to disable the signUp BTN
          console.log("Gros click", theOne);
        })
        this.markers = this.createmarker(rdv, otherRdvIcon);
      }

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
    let lemarker = marker([LErdv.lat, LErdv.long], {icon: icon}).addTo(this.map).bindPopup(document.getElementById(LErdv.id));
    return lemarker;
  }

  onSubmit($event) {
    $event.preventDefault();
    console.log("try to submit", $event);
  }
}

//TODO @AKaufi : styling
var otherRdvIcon = icon({
  iconUrl: './assets/imgs/marker.png',
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

