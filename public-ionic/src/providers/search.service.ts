import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Storage }          from '@ionic/storage';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DepotObject } from '../models/Depot-object';

@Injectable()
export class SearchService {
  storage: Storage = new Storage(null);

  constructor(private http: Http) {}

  search(term: string): Observable<DepotObject[]> {
    /*return this.storage.get('user').then(
      (user) => {

        return this.storage.get('token').then(
          (token) => {

          }
        );
      }
    );*/
    return this.http
      .get(
        'http://192.168.1.11:8080/depotObjects/search/test1@email.com/' + term, // End-point
        {headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'token'
        })}
      )
      .map(response => response.json().depotObjects as DepotObject[]);
  }
}
