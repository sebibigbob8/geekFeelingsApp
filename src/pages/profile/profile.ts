import {Component, NgZone, ViewChild} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {GlobalProvider} from "../../providers/global/global";
import {Storage} from "@ionic/storage";
import {ProfileRequest} from "../../models/profile-request";
import {QimgImage} from "../../models/QimgImage";
import {PictureProvider} from "../../providers/picture/picture";
import {config} from "../../app/config";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PictureRequest} from "../../models/picture-request";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(NgForm)
  form: NgForm;
  profileRequest: ProfileRequest;
  pictureRequest: PictureRequest;
  username = "";
  picture: QimgImage;
  pictures;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private http: HttpClient,
              public global: GlobalProvider, private storage: Storage, private pictureService: PictureProvider, public events: Events,
              private zone: NgZone) {
    this.profileRequest = new ProfileRequest();
    this.pictureRequest = new PictureRequest();
    storage.get('username').then((usernameGet) => {
      this.username = usernameGet;
      http.get(`${config.apiUrl}/users/${this.username}?username=true`, this.global.httpHeader).subscribe(response => {
        this.profileRequest.tag = response['tag'];
        this.profileRequest.description = response['description'];
      }, error => console.warn(error));
      http.get(`${config.apiUrl}/users/${this.username}/picture?username=true`, this.global.httpHeader).subscribe(response => {
        this.pictures = response;
      });
    });
  }

  onSubmit($event) {
    // Prevent default HTML form behavior.
    $event.preventDefault();
    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    //Profile
    let url = `${config.apiUrl}/users/${this.username}?username=true`;
    this.http.patch(url, this.profileRequest, this.global.httpHeader).subscribe(user => {
      console.log(user);
    }, err => {
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
      console.warn("with this request : " + this.profileRequest.tag + "-" + this.profileRequest.description);
    });
    //Picture
    if (typeof this.picture != 'undefined') {
            let url = `${config.apiUrl}/pictures`;
      console.log("My request picture: " + Object.keys(this.picture));
      this.pictureRequest.src = this.picture.url;
      this.http.post(url, this.pictureRequest, this.global.httpHeader).subscribe(picture => {
        console.log("new picture :" + picture);
        this.navCtrl.setRoot(this.navCtrl.getActive().component); //reload page
      }, err => {
        console.error(
          `Backend returned code ${err.status}, ` +
          `body was: ${err.error}`);
        console.warn("with this request : " + this.pictureRequest);
      });
    }
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
    }, err => {
      console.warn('Could not take picture', err.message);
    });
  }

  logOut() {
    this.auth.logOut();
  }

}
