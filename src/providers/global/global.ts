import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  //public urlAPI = "https://comem-webserv-2018-2019-g.herokuapp.com";
  public urlAPI = "http://localhost:3000";
  public qimgUrl: 'https://comem-qimg.herokuapp.com/api';
  public qimgSecret: 'changeme';
  public httpHeader = {
    headers: new HttpHeaders( {
      'Content-Type' : 'application/json',
    })
  };

  constructor(public http: HttpClient) {

  }

}
