import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Get reports request
   */
  getReports() {
    return this.storage.get('user').then(
      (user) => {

        return this.storage.get('token').then(
          (token: any) => {

            let seq = this.http.get(
              'http://192.168.1.11:8080/reports/' + user.email, // End-point
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
