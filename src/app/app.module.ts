import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RdvListPage} from "../pages/rdv-list/rdv-list";
import {RdvMapPage} from "../pages/rdv-map/rdv-map";
import {CreateRdvPage} from "../pages/create-rdv/create-rdv";
import { AuthProvider } from '../providers/auth/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { MbscModule } from '@mobiscroll/angular-lite';
import { FormsModule } from '@angular/forms';
import { GlobalProvider } from '../providers/global/global';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import {ProfilePage} from "../pages/profile/profile";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateRdvPage,
    RdvListPage,
    RdvMapPage,
    LoginPage,
    RegisterPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    MbscModule,
    FormsModule,
    IonicStorageModule.forRoot()
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
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GlobalProvider,
    AuthInterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true }
  ]
})
export class AppModule {}
