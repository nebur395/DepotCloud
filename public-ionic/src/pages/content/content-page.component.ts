import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'content-page',
  templateUrl: './content-page.component.html'
})
export class ContentPageComponent {

  constructor(
    public navCtrl: NavController
  ) { }

}
