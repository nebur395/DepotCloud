import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { Storage }          from '@ionic/storage';

import { User } from '../models/User';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';

@Injectable()
export class MemberService {
  storage: Storage = new Storage(null);

  constructor(
    private http: Http
  ) { }

  /**
   * Add member request
   */
  addMember(member: string) {
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
   * Modify member request
   */
  modifyMember(oldMember: string, newMember: string) {
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
  }

  /**
   * Delete member request
   */
  deleteMember(member: string) {
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
  }

  /**
   * Get member request
   */
  getMembers(): Promise<string[]> {
    return this.storage.get('user').then((user) => {
      return user.members;
    });
  }
}
