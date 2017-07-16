import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { DepotObject } from '../../models/depot-object';

@Component({
  selector: 'depot-objects-detail-page',
  templateUrl: 'depot-objects-detail-page.component.html'
})
export class DepotObjectsDetailPageComponent {
  depotObject: DepotObject;

  constructor(
    private navParams: NavParams
  ) {
    this.depotObject = navParams.get('depotObject');
  }
}
