import { Component }                      from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { WelcomePageComponent }             from '../welcome/welcome-page.component';

import { ReportService }  from '../../providers/report.service';
import { UserService }    from '../../providers/user.service';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'report-page',
  templateUrl: 'report-page.component.html',
  providers: [ReportService]
})
export class ReportPageComponent {
  currentReports: any[];

  constructor(
    private navCtrl: NavController,
    private reportService: ReportService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.reportService.getReports().then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {

            this.currentReports = resp.json().reports as any[];
            this.sortDates(this.currentReports);
            this.formateDates(this.currentReports);

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

  private formateDates(reports: any []): void {
    for (let report of reports) {
      report.reportDate = report.reportDate.substr(0, 10);
    }
  }

  private sortDates(reports: any[]):void {
    reports.sort(function(a, b){
      let x = a.reportDate.toLowerCase();
      let y = b.reportDate.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    })
  }
}
