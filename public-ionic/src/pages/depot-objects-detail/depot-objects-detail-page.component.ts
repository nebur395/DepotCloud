import { Component }                                 from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { WelcomePageComponent } from '../welcome/welcome-page.component';

import { DepotService } from '../../providers/depot.service';
import { UserService }  from '../../providers/user.service';

import { DepotObject }  from '../../models/depot-object';
import { Depot }        from '../../models/depot';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'depot-objects-detail-page',
  templateUrl: 'depot-objects-detail-page.component.html'
})
export class DepotObjectsDetailPageComponent {
  depotObject: DepotObject;
  depot: Depot;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private depotService: DepotService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.depotObject = navParams.get('depotObject');
  }

  ionViewDidLoad() {
    this.depotService.getDepot(this.depotObject.depot).then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            this.depot = resp.json().depot as Depot;

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
