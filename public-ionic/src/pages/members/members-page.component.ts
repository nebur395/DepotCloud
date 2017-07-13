import { Component }                                        from '@angular/core';
import { ModalController, ToastController, NavController }  from 'ionic-angular';
import { Storage }                                          from '@ionic/storage';

import { MemberCreatePageComponent } from '../members-create/members-create-page.component';
import { WelcomePageComponent }      from '../welcome/welcome-page.component';

import { MemberService }  from '../../providers/member.service';
import { UserService }    from '../../providers/user.service';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'members-page',
  templateUrl: 'members-page.component.html'
})
export class MembersPageComponent {
  storage: Storage = new Storage(null);
  currentMembers: string[];
  currentMember: string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private memberService: MemberService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.storage.get('member').then((member) => {
      this.currentMember = member;
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.memberService.getMembers().then(
      (members: string[]) => {
        this.currentMembers = members
      }
    );
  }

  selectedMember(member: string): boolean {
    return this.currentMember === member;
  }

  selectMember(member: string): void {
    this.storage.set('member', member).then(() => {
      this.currentMember = member;
    });
  }

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  addMember(): void {
    let addModal = this.modalCtrl.create(MemberCreatePageComponent);

    addModal.onDidDismiss((member: string) => {
      if (member) {
        this.memberService.addMember(member).then(
          (observable: Observable<any>) => {
            observable.subscribe(
              (resp) => {

                let jsonResp = resp.json();

                // User created
                let toast = this.toastCtrl.create({
                  message: jsonResp.message,
                  position: 'bottom',
                  duration: 4000,
                  cssClass: 'toast-success'
                });
                toast.present();
                this.currentMembers.push(member);


              }, (err) => {

                let jsonErr = err.json();

                // Unable to sign up
                let toast = this.toastCtrl.create({
                  message: jsonErr.message,
                  position: 'bottom',
                  duration: 4000,
                  cssClass: 'toast-error'
                });
                toast.present();

                if (err.status === 401) {
                  this.tokenErrorHandler();
                }

              });
          }
        );
      }
    });
    addModal.present();
  }

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  modifyMember(oldMember: string): void {
    let addModal = this.modalCtrl.create(MemberCreatePageComponent, { memberName: oldMember});

    addModal.onDidDismiss((member: string) => {
      if (member) {
        this.memberService.modifyMember(oldMember, member).then(
          (observable: Observable<any>) => {
            observable.subscribe(
              (resp) => {

                let jsonResp = resp.json();

                // User created
                let toast = this.toastCtrl.create({
                  message: jsonResp.message,
                  position: 'bottom',
                  duration: 4000,
                  cssClass: 'toast-success'
                });
                toast.present();

                let index = this.currentMembers.indexOf(oldMember);
                this.currentMembers.splice(index, 1);
                this.currentMembers.push(member);

              }, (err) => {

                let jsonErr = err.json();

                // Unable to sign up
                let toast = this.toastCtrl.create({
                  message: jsonErr.message,
                  position: 'bottom',
                  duration: 4000,
                  cssClass: 'toast-error'
                });
                toast.present();

                if (err.status === 401) {
                  this.tokenErrorHandler();
                }

              });
          }
        );
      }
    });
    addModal.present();
  }

  /**
   * Delete a member from the list of members.
   */
  deleteMember(member: string): void {
    this.memberService.deleteMember(member).then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            let jsonResp = resp.json();

            // User created
            let toast = this.toastCtrl.create({
              message: jsonResp.message,
              position: 'bottom',
              duration: 4000,
              cssClass: 'toast-success'
            });
            toast.present();

            let index = this.currentMembers.indexOf(member);
            this.currentMembers.splice(index, 1);

          }, (err) => {

            let jsonErr = err.json();

            // Unable to sign up
            let toast = this.toastCtrl.create({
              message: jsonErr.message,
              position: 'bottom',
              duration: 4000,
              cssClass: 'toast-error'
            });
            toast.present();

            if (err.status === 401) {
              this.tokenErrorHandler();
            }

          });
      }
    );
  }

  tokenErrorHandler(): void {
    this.userService.logout().then(
      () => {
        this.navCtrl.setRoot(WelcomePageComponent, {}, {
          animate: true,
          direction: 'forward'
        });
      }
    );
  }
}
