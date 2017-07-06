import { Component }     from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';


@Component({
  selector: 'search-page',
  templateUrl: 'search-page.component.html'
})
export class SearchPageComponent {

  currentItems: any = [];

  constructor(
    public navCtrl: NavController,
    public items: Items
  ) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev: any): void {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
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
