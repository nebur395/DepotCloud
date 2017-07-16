import { Component }                      from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';

import { WelcomePageComponent }       from '../welcome/welcome-page.component';
import { MembersPageComponent }       from '../members/members-page.component';

import { Depot } from '../../models/depot';
import { DepotObject } from '../../models/depot-object';

import { DepotObjectService } from '../../providers/depot-object.service';
import { UserService }    from '../../providers/user.service';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Observable } from "rxjs/Observable";

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'depot-objects-page',
  templateUrl: 'depot-objects-page.component.html'
})
export class DepotObjectsPageComponent {
  depot: Depot;
  currentDepotObjects: DepotObject[] = [];
  currentItems: Item[];

  constructor(
    private navCtrl: NavController,
    private items: Items,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private depotObjectService: DepotObjectService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.depot = navParams.get('depot');
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.depotObjectService.getDepotObjects(this.depot._id).then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            this.currentDepotObjects = resp.json().depotObjects as DepotObject[];

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
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  /*addItem(): void {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    });
    addModal.present();
  }*/

  /**
   * Delete an item from the list of items.
   */
  /*deleteItem(item: Item): void {
    this.items.delete(item);
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

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item): void {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
