import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

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
      );

      seq
        .map(res => res.json())
        .subscribe( () => { }, () => { } );

      return seq;

    });
  }

  /**
   * Modify depotObject request
   */
  modifyDepotObject(depotID: any, depotObjectID: any, depotObject: DepotObject) {
    return this.storage.get('token').then((token) => {

      let seq = this.http.put(
        'http://192.168.1.11:8080/depotObjects/' + depotID + '/' + depotObjectID, // End-point
        JSON.stringify(depotObject),
        {headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })}
      );

      seq
        .map(res => res.json())
        .subscribe( () => { }, () => { } );

      return seq;

    });
  }

  /**
   * Delete depotObject request
   */
  deleteDepotObject(depotID: any, member: string, depotObject: DepotObject) {
        return this.storage.get('token').then((token) => {

          let seq = this.http.delete(
            'http://192.168.1.11:8080/depotObjects/' + depotID + '/' + depotObject._id, // End-point
            {
              body: JSON.stringify({
                owner: depotObject.owner,
                member: member
              }),
              headers: new Headers({   // Headers
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              })
            }
          );

          seq
            .map(res => res.json())
            .subscribe( () => { }, () => { } );

          return seq;

        });
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
        );

        seq
          .map(res => res.json())
          .subscribe( () => { }, () => { } );

        return seq;

      });

  }
}
