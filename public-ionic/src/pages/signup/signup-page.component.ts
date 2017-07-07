import { Component }                       from '@angular/core';
import { MenuController, ToastController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.component.html'
})
export class SignupPageComponent {

  // The account fields for the login form
  account: {
    name: string,
    email: string,
    password: string,
    rePassword: string
  } = {
    name: '',
    email: '',
    password: '',
    rePassword: ''
  };

  constructor(
    private menu: MenuController,
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  doSignup(): void {
    // Attempt to login in through our User service
    this.userService.signup(this.account).subscribe(
      (resp) => {

        let jsonResp = resp.json();

        // User created
        let toast = this.toastCtrl.create({
          message: jsonResp.message,
          position: 'bottom',
          duration: 4000,
          cssClass: 'toast-success'
        });
        toast.present();


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
