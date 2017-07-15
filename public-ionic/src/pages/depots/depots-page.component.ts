import { Component }                                        from '@angular/core';
import { ModalController, ToastController, NavController }  from 'ionic-angular';
import { Storage }                                          from '@ionic/storage';

import { DepotsCreatePageComponent } from '../depots-create/depots-create-page.component';
import { WelcomePageComponent }      from '../welcome/welcome-page.component';
import { ItemDetailPage }            from '../item-detail/item-detail';
import { MembersPageComponent }      from '../members/members-page.component';

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
  addItem(): void {
    let addModal = this.modalCtrl.create(DepotsCreatePageComponent);

    addModal.onDidDismiss((depot) => {
      if (depot) {
        console.log(depot);

        this.storage.get('member').then((member) => {
          if (member) {

            depot = this.addMember(member, depot);
            console.log(depot);

            this.depotService.addDepot(depot).then(
              (observable: Observable<any>) => {
                observable.subscribe(
                  (resp) => {

                    let jsonResp = resp.json().depot as Depot;

                    // User created
                    let toast = this.toastCtrl.create({
                      message: "Almacén creado correctamente.",
                      position: 'bottom',
                      duration: 4000,
                      cssClass: 'toast-success'
                    });
                    toast.present();
                    this.currentDepots.push(jsonResp);
                    console.log(this.currentDepots);


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
          } else {
            this.memberErrorHandler();
          }
        });
      }
    });
    addModal.present();
  }

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

  memberErrorHandler(): void {
    // Unable to sign up
    let toast = this.toastCtrl.create({
      message: "Tienes que identificarte como un miembro de la familia antes de realizar dicha acción.",
      position: 'bottom',
      duration: 4000,
      cssClass: 'toast-error'
    });
    toast.present();

    this.navCtrl.setRoot(MembersPageComponent, {}, {});
  }

  addMember(member: string, depot: any): any {
    return  {
      name: depot.name,
      location: depot.location,
      type: depot.type,
      distance: depot.distance,
      description: depot.description,
      member: member
    };
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
