import { Component, ViewChild }                 from '@angular/core';
import { ToastController, NavController }       from 'ionic-angular';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Storage }                              from '@ionic/storage';

import { WelcomePageComponent }      from '../welcome/welcome-page.component';

import { SettingsService } from '../../providers/settings.service';
import { UserService }     from '../../providers/user.service';

import { User } from '../../models/User';

import { Observable } from "rxjs/Observable";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'settings-page',
  templateUrl: 'settings-page.component.html'
})
export class SettingsPageComponent {
  @ViewChild('fileInput') fileInput;

  email: string;
  storage: Storage = new Storage(null);
  isReadyToSave: boolean;
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private settingsService: SettingsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.storage.get('user').then(
      (user: User) => {
        if (user) {
          this.email = user.email;
          this.form.patchValue({
            name: user.name
          });
        }
      }
    );
  }

  saveUser(): void {
    console.log("saved");
    let settings = {
      name: this.form.value.name,
      current: this.form.value.currentPassword,
      new : this.form.value.newPassword
    };
    this.settingsService.updateUser(settings).then(
      (observable: Observable<any>) => {
        observable.subscribe(
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

            if (err.status === 401) {
              this.tokenErrorHandler();
            }

          });
      }
    );
  }

  deleteUser(): void {
    console.log("deleted");
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
