import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import { User } from '../models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MemberService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Log the user out, which forgets the session
   */
  add(member: string) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.post(
            'http://192.168.1.11:8080/members/' + user.email + '/' +  member, // End-point
            {},
            {headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => {

              user.members.push(member);
              this.storage.set('user', user);

            }, () => { } );

          return seq;

        });

      }
    );
  }

  /**
   * Process a login/signup response to store user data
   */
  getMembers(): Promise<string[]> {
    return this.storage.get('user').then((user) => {
      return user.members;
    });
  }
}
