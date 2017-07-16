import { Component }                                                  from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Storage }                                                    from '@ionic/storage';

import { WelcomePageComponent }             from '../welcome/welcome-page.component';
import { MembersPageComponent }             from '../members/members-page.component';
import { DepotObjectsCreatePageComponent }  from '../depot-objects-create/depot-objects-create-page.component';

import { Depot }        from '../../models/depot';
import { DepotObject }  from '../../models/depot-object';
import { User }         from '../../models/user';

import { DepotObjectService } from '../../providers/depot-object.service';
import { UserService }        from '../../providers/user.service';

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
  storage: Storage = new Storage(null);
  depot: Depot;
  currentDepotObjects: DepotObject[] = [];
  loadingDepotObjects: boolean = false;
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
    this.loadingDepotObjects = true;
    this.depotObjectService.getDepotObjects(this.depot._id).then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {
            this.loadingDepotObjects = false;

            this.currentDepotObjects = resp.json().depotObjects as DepotObject[];

          }, (err) => {
            this.loadingDepotObjects = false;

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
  addItem(): void {
    let addModal = this.modalCtrl.create(DepotObjectsCreatePageComponent);

    addModal.onDidDismiss((depotObject) => {
      if (depotObject) {

        this.storage.get('member').then((member) => {
          if (member) {
            this.storage.get('user').then((user) => {

              depotObject = this.addUserAndMember(user, member, depotObject);

              this.depotObjectService.addDepotObject(this.depot._id, depotObject).then(
                (observable: Observable<any>) => {
                  observable.subscribe(
                    (resp) => {

                      let jsonResp = resp.json().depotObject as DepotObject;

                      // User created
                      let toast = this.toastCtrl.create({
                        message: "Objeto de almacén creado correctamente.",
                        position: 'bottom',
                        duration: 4000,
                        cssClass: 'toast-success'
                      });
                      toast.present();

                      this.currentDepotObjects.push(jsonResp);

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
            });
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
  modifyItem(depotObject: DepotObject): void {
    let addModal = this.modalCtrl.create(DepotObjectsCreatePageComponent, { depotObject: depotObject});

    addModal.onDidDismiss((newDepotObject) => {
      if (newDepotObject) {

        this.storage.get('member').then((member) => {
          if (member) {
            this.storage.get('user').then((user) => {

              newDepotObject = this.addUserAndMember(user, member, newDepotObject);

              this.depotObjectService.modifyDepotObject(this.depot._id, depotObject._id, newDepotObject).then(
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

                      let index = this.currentDepotObjects.findIndex(index => index._id === newDepotObject._id);
                      depotObject = {
                        owner: depotObject.owner,
                        _id: depotObject._id,
                        depot: depotObject.depot,
                        name: newDepotObject.name,
                        image: newDepotObject.image,
                        guarantee: newDepotObject.guarantee,
                        dateOfExpiry: newDepotObject.dateOfExpiry,
                        description: newDepotObject.description
                      };
                      this.currentDepotObjects[index] = depotObject;

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

            });
          } else {
            this.memberErrorHandler();
          }
        });
      }
    });
    addModal.present();
  }

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

  addUserAndMember(user: User, member: string, depotObject: any): any {
    return  {
      owner: user.email,
      name: depotObject.name,
      image: depotObject.image,
      guarantee: depotObject.guarantee,
      dateOfExpiry: depotObject.dateOfExpiry,
      description: depotObject.description,
      member: member
    };
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
