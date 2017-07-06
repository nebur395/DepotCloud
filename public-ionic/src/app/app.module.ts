import { NgModule, ErrorHandler }                   from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { HttpModule, Http }                         from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule }              from '@ionic/storage';

import { AppComponent }       from './app.component';

import { ContentPageComponent }   from '../pages/content/content-page.component';
import { ItemCreatePage }         from '../pages/item-create/item-create';
import { ItemDetailPage }         from '../pages/item-detail/item-detail';
import { DepotsPageComponent }    from '../pages/depots/depots-page.component';
import { LoginPageComponent }     from '../pages/login/login-page.component';
import { SearchPageComponent }    from '../pages/search/search-page.component';
import { SettingsPageComponent }  from '../pages/settings/settings-page.component';
import { SignupPageComponent }    from '../pages/signup/signup-page.component';
import { TutorialPageComponent }  from '../pages/tutorial/tutorial-page.component';
import { WelcomePageComponent }   from '../pages/welcome/welcome-page.component';

import { Api }      from '../providers/api';
import { Items }    from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { User }     from '../providers/user';

import { Camera }       from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar }    from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader }              from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    AppComponent,
    ContentPageComponent,
    ItemCreatePage,
    ItemDetailPage,
    DepotsPageComponent,
    LoginPageComponent,
    SearchPageComponent,
    SettingsPageComponent,
    SignupPageComponent,
    TutorialPageComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    ContentPageComponent,
    ItemCreatePage,
    ItemDetailPage,
    DepotsPageComponent,
    LoginPageComponent,
    SearchPageComponent,
    SettingsPageComponent,
    SignupPageComponent,
    TutorialPageComponent,
    WelcomePageComponent
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
