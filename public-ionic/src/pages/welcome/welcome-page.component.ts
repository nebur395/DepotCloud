import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { LoginPageComponent }   from '../login/login-page.component';
import { SignupPageComponent }  from '../signup/signup-page.component';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome-page.component.html'
})
export class WelcomePageComponent {

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
  ) { }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  login() {
    this.navCtrl.push(LoginPageComponent);
  }

  signup() {
    this.navCtrl.push(SignupPageComponent);
  }
}
