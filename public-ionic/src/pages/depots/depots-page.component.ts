import { Component }                      from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'depots-page',
  templateUrl: 'depots-page.component.html'
})
export class DepotsPageComponent {
  currentItems: Item[];

  constructor(
    private navCtrl: NavController,
    private items: Items,
    private modalCtrl: ModalController
  ) { }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.currentItems = this.items.query();
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem(): void {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    });
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item: Item): void {
    this.items.delete(item);
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
