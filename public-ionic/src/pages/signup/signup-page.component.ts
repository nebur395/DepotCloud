import { Component }                                      from '@angular/core';
import { MenuController, NavController, ToastController } from 'ionic-angular';

import { DepotsPageComponent } from '../depots/depots-page.component';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.component.html'
})
export class SignupPageComponent {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private user: User,
    private toastCtrl: ToastController,
    private translateService: TranslateService
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
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

  doSignup(): void {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(DepotsPageComponent);
    }, (err) => {

      this.navCtrl.setRoot(DepotsPageComponent, {}, {
        animate: true,
        direction: 'forward'
      }); // TODO: Remove this when you add your signup endpoint

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
