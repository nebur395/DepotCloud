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
  /*addMember(member: string) {
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
  }*/

  /**
   * Modify member request
   */
  /*modifyMember(oldMember: string, newMember: string) {
    return this.storage.get('user').then(
      (user: User) => {

        return this.storage.get('token').then((token) => {

          let seq = this.http.put(
            'http://192.168.1.11:8080/members/' + user.email + '/' +  oldMember, // End-point
            JSON.stringify({newName: newMember}),
            {headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })}
          ).share();

          seq
            .map(res => res.json())
            .subscribe( () => {

              let index = user.members.indexOf(oldMember);
              user.members.splice(index, 1);
              user.members.push(newMember);
              this.storage.set('user', user);

            }, () => { } );

          return seq;

        });

      }
    );
  }*/

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
