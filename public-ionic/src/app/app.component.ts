import { Component, ViewChild }   from '@angular/core';
import { Platform, Nav, Config }  from 'ionic-angular';

import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContentPageComponent }  from '../pages/content/content-page.component';
import { MembersPageComponent }  from '../pages/members/members-page.component';
import { DepotsPageComponent }   from '../pages/depots/depots-page.component';
import { SearchPageComponent }   from '../pages/search/search-page.component';
import { SettingsPageComponent } from '../pages/settings/settings-page.component';
import { TutorialPageComponent } from '../pages/tutorial/tutorial-page.component';
import { WelcomePageComponent }  from '../pages/welcome/welcome-page.component';

import { UserService } from '../providers/user.service';

@Component({
  templateUrl: `app.component.html`
})
export class AppComponent {
  rootPage = WelcomePageComponent;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Miembros', component: MembersPageComponent },
    { title: 'Almacenes', component: DepotsPageComponent },
    { title: 'Buscar trastos', component: SearchPageComponent },
    { title: 'Actividades', component: ContentPageComponent },
    { title: 'Recomendaciones', component: ContentPageComponent },
    { title: 'Settings', component: SettingsPageComponent },
    { title: 'Tutorial', component: TutorialPageComponent }
  ];

  constructor(
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userService: UserService
  ) {
    this.config.set('ios', 'backButtonText', "Back");

    this.userService.checkLogged().then(
      (logged) => {
        if (logged) {
          this.nav.setRoot(MembersPageComponent);
        }
      }
    );
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: any): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.userService.logout().then(
      () => {
        this.nav.setRoot(WelcomePageComponent);
      }
    );
  }
}
