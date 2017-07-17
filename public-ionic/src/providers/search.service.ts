import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Storage }          from '@ionic/storage';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DepotObject } from '../models/Depot-object';
import { User } from '../models/User';

@Injectable()
export class SearchService {
  storage: Storage = new Storage(null);
  user: User;
  token: string;


  constructor(
    private http: Http
  ) {
    this.storage.get('user').then((user) => this.user = user);
    this.storage.get('token').then((token) => this.token = token);
  }

  search(term: string): Observable<DepotObject[]> {
    return this.http
      .get(
        'http://192.168.1.11:8080/depotObjects/search/' + this.user.email + '/' + term, // End-point
        {headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        })}
      )
      .map(response => response.json().depotObjects as DepotObject[]);
  }
}
