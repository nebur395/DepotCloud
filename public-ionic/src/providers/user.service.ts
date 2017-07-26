import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';
import { JwtHelper }        from 'angular2-jwt';

import { User } from '../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  storage: Storage = new Storage(null);
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(
    private http: Http
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
        this.storage.set('token', res.token);
        let user = this.jwtHelper.decodeToken(res.token) as User;
        this.storage.set('user', user);

      }, () => {});

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
  logout(): Promise<any> {
    return this.storage.remove('token').then(
      () => {
        return this.storage.remove('user').then(
          () => {
            return this.storage.remove('member');
          }
        );
      }
    );
  }

  /**
   * Process a login/signup response to store user data
   */
  checkLogged(): Promise<boolean> {
    return this.storage.get('token').then((token) => {
      if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        return this.logout().then( () => {return false} );
      }
    });
  }
}
