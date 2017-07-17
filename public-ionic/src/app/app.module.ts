import { NgModule, ErrorHandler }                   from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { HttpModule, Http }                         from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule }                       from '@ionic/storage';

import { AppComponent }       from './app.component';

import { ContentPageComponent }             from '../pages/content/content-page.component';
import { MembersPageComponent }             from '../pages/members/members-page.component';
import { MemberCreatePageComponent }        from '../pages/members-create/members-create-page.component';
import { DepotsPageComponent }              from '../pages/depots/depots-page.component';
import { DepotsCreatePageComponent }        from '../pages/depots-create/depots-create-page.component';
import { DepotObjectsPageComponent }        from '../pages/depot-objects/depot-objects-page.component';
import { DepotObjectsCreatePageComponent }  from '../pages/depot-objects-create/depot-objects-create-page.component';
import { DepotObjectsDetailPageComponent }  from '../pages/depot-objects-detail/depot-objects-detail-page.component';
import { LoginPageComponent }               from '../pages/login/login-page.component';
import { SearchPageComponent }              from '../pages/search/search-page.component';
import { SettingsPageComponent }            from '../pages/settings/settings-page.component';
import { SignupPageComponent }              from '../pages/signup/signup-page.component';
import { TutorialPageComponent }            from '../pages/tutorial/tutorial-page.component';
import { WelcomePageComponent }             from '../pages/welcome/welcome-page.component';
import { ActivityPageComponent }            from '../pages/activity/activity-page.component';
import { ReportPageComponent }              from '../pages/reports/report-page.component';

import { Api }                  from '../providers/api';
import { Items }                from '../mocks/providers/items';
import { SettingsService }      from '../providers/settings.service';
import { UserService }          from '../providers/user.service';
import { MemberService }        from '../providers/member.service';
import { DepotService }         from '../providers/depot.service';
import { DepotObjectService }   from '../providers/depot-object.service';

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
    DepotsPageComponent,
    DepotObjectsPageComponent,
    DepotObjectsCreatePageComponent,
    DepotObjectsDetailPageComponent,
    DepotsCreatePageComponent,
    LoginPageComponent,
    SearchPageComponent,
    SettingsPageComponent,
    SignupPageComponent,
    TutorialPageComponent,
    WelcomePageComponent,
    MembersPageComponent,
    MemberCreatePageComponent,
    ActivityPageComponent,
    ReportPageComponent
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
    DepotsPageComponent,
    DepotObjectsPageComponent,
    DepotObjectsCreatePageComponent,
    DepotObjectsDetailPageComponent,
    DepotsCreatePageComponent,
    LoginPageComponent,
    SearchPageComponent,
    SettingsPageComponent,
    SignupPageComponent,
    TutorialPageComponent,
    WelcomePageComponent,
    MembersPageComponent,
    MemberCreatePageComponent,
    ActivityPageComponent,
    ReportPageComponent
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
    DepotService,
    DepotObjectService,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
