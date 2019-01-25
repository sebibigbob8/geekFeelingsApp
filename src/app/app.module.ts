import { RdvService } from './../pages/RdvService';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {RdvListPage} from "../pages/rdv-list/rdv-list";
import {RdvMapPage} from "../pages/rdv-map/rdv-map";
import {CreateRdvPage} from "../pages/create-rdv/create-rdv";
import {ModifyRdvPage} from "../pages/modify-rdv/modify-rdv";
import {AuthProvider} from '../providers/auth/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {MbscModule} from '@mobiscroll/angular-lite';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalProvider} from '../providers/global/global';
import {IonicStorageModule} from '@ionic/storage';
import {AuthInterceptorProvider} from '../providers/auth-interceptor/auth-interceptor';
import {ProfilePage} from "../pages/profile/profile";
import {TagInputModule} from "ngx-chips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PictureProvider} from '../providers/picture/picture';
import {Camera} from "@ionic-native/camera";
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateRdvPage,
    RdvListPage,
    RdvMapPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ModifyRdvPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    MbscModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateRdvPage,
    RdvListPage,
    RdvMapPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ModifyRdvPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GlobalProvider,
    PictureProvider,
    Camera,
    Geolocation,
    AuthInterceptorProvider,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true},
    RdvService

  ]
})
export class AppModule {
}
