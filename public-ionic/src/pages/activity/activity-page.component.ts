import { Component }                                                  from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';

import { WelcomePageComponent }             from '../welcome/welcome-page.component';

import { ActivityService }  from '../../providers/activity.service';
import { UserService }      from '../../providers/user.service';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'activity-page',
  templateUrl: 'activity-page.component.html',
  providers: [ActivityService]
})
export class ActivityPageComponent {
  currentActivities: any[];

  constructor(
    private navCtrl: NavController,
    private activityService: ActivityService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.activityService.getActivities().then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            this.currentActivities = resp.json().activities as any[];
            this.sortDates(this.currentActivities);
            this.formateDates(this.currentActivities);
            console.log(this.currentActivities);

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

  private formateDates(activities: any []): void {
    for (let activity of activities) {
      activity.activityDate = activity.activityDate.substr(0, 10);
    }
  }

  private sortDates(activities: any[]):void {
    activities.sort(function(a, b){
      let x = a.activityDate.toLowerCase();
      let y = b.activityDate.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    })
  }
}
