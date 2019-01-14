import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';
import { User } from '../../models/user';
import {GlobalProvider} from "../global/global";
import { delayWhen, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
<<<<<<< HEAD
import { config } from '../../app/config';
=======
import {config} from "../../app/config";
>>>>>>> 10893d73485a4e582eef627953944bb43b3c606b

/**
 * Authentication service for login/logout.
 */
@Injectable()
export class AuthProvider {

  private auth$: Observable<AuthResponse>;
  private authSource: ReplaySubject<AuthResponse>; // Observable


  constructor(private http: HttpClient,public global: GlobalProvider, private storage: Storage) {
    this.authSource = new ReplaySubject(1);
    this.auth$ = this.authSource.asObservable();

    this.storage.get('auth').then(auth => {
      // Push the loaded value into the observable stream.
      this.authSource.next(auth);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth$.pipe(map(auth => !!auth));
  }

  getUser(): Observable<User> {
    return this.auth$.pipe(map(auth => auth ? auth.user : undefined));
  }

  getToken(): Observable<string> {
    return this.auth$.pipe(map(auth => auth ? auth.token : undefined));
  }

  logIn(authRequest: AuthRequest): Observable<User> {

    //delayWhen = Retarde la suite
<<<<<<< HEAD
    //const authUrl = this.global.urlAPI+'/login';
    const authUrl = `${config.apiUrl}/auth`;
=======
    const authUrl = config.apiUrl+'/login';
>>>>>>> 10893d73485a4e582eef627953944bb43b3c606b
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen(auth => {
        return this.saveAuth(auth);
      }),
      map(auth => {
        this.authSource.next(auth);
        return auth.user;
      })
    );
  }
  logOut() {
    this.authSource.next(null);
    this.storage.remove('auth');
    this.storage.remove('username');
    console.log('User logged out');
  }

  private saveAuth(auth: AuthResponse): Observable<void> {
    return Observable.fromPromise(this.storage.set('auth', auth));
  }

}
