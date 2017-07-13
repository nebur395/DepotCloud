import { Component }                                      from '@angular/core';
import { MenuController, NavController, ToastController } from 'ionic-angular';

import { MembersPageComponent }  from '../../pages/members/members-page.component';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    email: string,
    password: string
  } = {
    email: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

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
    this.userService.login(this.account).subscribe(
      (resp) => {

        this.navCtrl.setRoot(MembersPageComponent, {}, {
          animate: true,
          direction: 'forward'
        });

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

    });
  }
}
