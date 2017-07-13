import { Component }                                        from '@angular/core';
import { ModalController, ToastController, NavController }  from 'ionic-angular';
import { Storage }                                          from '@ionic/storage';

import { DepotsCreatePageComponent } from '../depots-create/depots-create-page.component';
import { WelcomePageComponent }      from '../welcome/welcome-page.component';
import { ItemDetailPage }            from '../item-detail/item-detail';

import { Depot } from '../../models/depot';

import { DepotService }   from '../../providers/depot.service';
import { UserService }    from '../../providers/user.service';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'depots-page',
  templateUrl: 'depots-page.component.html'
})
export class DepotsPageComponent {
  storage: Storage = new Storage(null);
  currentDepots: Depot[];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private depotService: DepotService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.depotService.getDepots().then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            this.currentDepots = resp.json().depots as Depot[];

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

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  /*addMember(): void {
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
  }*/

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  /*modifyMember(oldMember: string): void {
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
  }/*

  /**
   * Delete a member from the list of members.
   */
  /*deleteMember(member: string): void {
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
  }*/

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

  /**
   * Navigate to the detail page for this item.
   */
  openItem(depot: Depot): void {
    let item = {
      "name": "Burt Bear",
      "profilePic": "assets/img/speakers/bear.jpg",
      "about": "Burt is a Bear."
    };
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
