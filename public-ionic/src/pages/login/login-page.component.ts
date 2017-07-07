import { Component }                                      from '@angular/core';
import { MenuController, NavController, ToastController } from 'ionic-angular';

import { DepotsPageComponent } from '../depots/depots-page.component';

import { UserService } from '../../providers/user.service';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private user: UserService,
    private toastCtrl: ToastController,
    private translateService: TranslateService
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  // Attempt to login in through our User service
  doLogin(): void {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.setRoot(DepotsPageComponent, {}, {
        animate: true,
        direction: 'forward'
      });
    }, (err) => {
      this.navCtrl.setRoot(DepotsPageComponent, {}, {
        animate: true,
        direction: 'forward'
      }); // TODO: Remove this when you add your signup endpoint

      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
