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
    let seq = this.api.post('login', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        } else {
        }
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
      '/users/', // End-point
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
