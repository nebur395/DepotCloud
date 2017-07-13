import { NgModule, ErrorHandler }                   from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { HttpModule, Http }                         from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule }              from '@ionic/storage';

import { AppComponent }       from './app.component';

import { ContentPageComponent }        from '../pages/content/content-page.component';
import { ItemCreatePage }              from '../pages/item-create/item-create';
import { ItemDetailPage }              from '../pages/item-detail/item-detail';
import { DepotsPageComponent }         from '../pages/depots/depots-page.component';
import { LoginPageComponent }          from '../pages/login/login-page.component';
import { SearchPageComponent }         from '../pages/search/search-page.component';
import { SettingsPageComponent }       from '../pages/settings/settings-page.component';
import { SignupPageComponent }         from '../pages/signup/signup-page.component';
import { TutorialPageComponent }       from '../pages/tutorial/tutorial-page.component';
import { WelcomePageComponent }        from '../pages/welcome/welcome-page.component';
import { MembersPageComponent }        from '../pages/members/members-page.component';
import { MemberCreatePageComponent }   from '../pages/members-create/members-create-page.component';
import { DepotObjectsPageComponent }   from '../pages/depotObjects/depotObjects-page.component';

import { Api }              from '../providers/api';
import { Items }            from '../mocks/providers/items';
import { SettingsService }  from '../providers/settings.service';
import { UserService }      from '../providers/user.service';
import { MemberService }    from '../providers/member.service';

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
    WelcomePageComponent,
    MembersPageComponent,
    MemberCreatePageComponent,
    DepotObjectsPageComponent
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
    WelcomePageComponent,
    MembersPageComponent,
    MemberCreatePageComponent,
    DepotObjectsPageComponent
  ],
  providers: [
    Api,
    Items,
    UserService,
    MemberService,
    Camera,
    SplashScreen,
    StatusBar,
    SettingsService,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
