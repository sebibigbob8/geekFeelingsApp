import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  public urlAPI = "https://comem-webserv-2018-2019-g.herokuapp.com";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}
