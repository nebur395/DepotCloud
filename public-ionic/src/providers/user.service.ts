import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import { User } from '../models/User';

import { Api } from './api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
  _user: any;

  constructor(
    private http: Http,
    private api: Api
  ) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {

    let baseEncoded = btoa(accountInfo.email + ":" + accountInfo.password);

    let seq = this.http.get(
      'http://192.168.1.11:8080/login/', // End-point
      {headers: new Headers({
        'Authorization': 'Basic ' + baseEncoded
      })}
    ).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.error('SUCCESS', res);
        /*if (res.status == 'success') {
          this._loggedIn(res);
        } else {
        }*/
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {

    let seq = this.http.post(
      'http://192.168.1.11:8080/users/', // End-point
      JSON.stringify(accountInfo), // Body
      {headers: new Headers({
        'Content-Type': 'application/json'
      })}
      ).share();

    seq
      .map(res => res.json())
      .subscribe( () => {}, () => {});

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
