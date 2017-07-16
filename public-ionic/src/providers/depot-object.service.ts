import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import { User }  from '../models/User';
import { Depot } from '../models/Depot';
import { DepotObject } from '../models/depot-object';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepotObjectService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Add depotObject request
   */
  addDepotObject(depotID: string, depotObject: DepotObject) {
    return this.storage.get('token').then((token) => {

      let seq = this.http.post(
        'http://192.168.1.11:8080/depotObjects/' + depotID, // End-point
        JSON.stringify(depotObject),
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
   * Delete depot request
   */
  deleteDepot(id: any, member: string) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.delete(
            'http://192.168.1.11:8080/depots/' + user.email + '/' +  id, // End-point
            {
              body: JSON.stringify({member: member}),
              headers: new Headers({   // Headers
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              })
            }
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
  }

  /**
   * Get depotObjects request
   */
  getDepotObjects(depotID: string) {
    return this.storage.get('token').then(
      (token: any) => {

        let seq = this.http.get(
          'http://192.168.1.11:8080/depotObjects/' + depotID, // End-point
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
}
