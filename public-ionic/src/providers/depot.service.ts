import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import { User }  from '../models/User';
import { Depot } from '../models/Depot';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepotService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Add depot request
   */
  addDepot(depot: Depot) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.post(
            'http://192.168.1.11:8080/depots/' + user.email, // End-point
            JSON.stringify(depot),
            {headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => { }, () => { } );

          return seq;

        });

      }
    );
  }

  /**
   * Modify depot request
   */
  modifyDepot(id: any, depot: Depot) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.put(
            'http://192.168.1.11:8080/depots/' + user.email + '/' +  id, // End-point
            JSON.stringify(depot),
            {headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => { }, () => { } );

          return seq;

        });

      }
    );
  }

  /**
   * Delete member request
   */
  /*deleteMember(member: string) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.delete(
            'http://192.168.1.11:8080/members/' + user.email + '/' +  member, // End-point
            {headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => {

              let index = user.members.indexOf(member);
              user.members.splice(index, 1);
              this.storage.set('user', user);

            }, () => { } );

          return seq;

        });

      }
    );
  }*/

  /**
   * Get depots request
   */
  getDepots() {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then(
          (token: any) => {

            let seq = this.http.get(
              'http://192.168.1.11:8080/depots/' + user.email, // End-point
              {headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              })}
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
