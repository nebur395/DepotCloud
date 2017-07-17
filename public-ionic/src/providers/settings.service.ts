import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import { User } from '../models/User';
import 'rxjs/add/operator/share';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class SettingsService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Update user request
   */
  updateUser(updatedUser: any) {

    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.put(
            'http://192.168.1.11:8080/users/' + user.email, // End-point
            JSON.stringify(updatedUser),  // Body
            {headers: new Headers({   // Headers
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => {

              user.name = updatedUser.name;
              this.storage.set('user', user);

            }, () => { } );

          return seq;

        });

      }
    );
  }

  /**
   * Delete user request
   */
  deleteUser(deletedUser: any) {

    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.delete(
            'http://192.168.1.11:8080/users/' + user.email, // End-point
            {
              body: JSON.stringify(deletedUser),
              headers: new Headers({   // Headers
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              })
            }
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => { }, () => { } );

          return seq;

        });

      }
    );
  }

}
