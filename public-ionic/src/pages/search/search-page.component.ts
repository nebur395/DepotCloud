import { Component }                      from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { WelcomePageComponent }             from '../welcome/welcome-page.component';
import { DepotObjectsDetailPageComponent }  from '../depot-objects-detail/depot-objects-detail-page.component';

import { DepotObject }  from '../../models/depot-object';

import { SearchService }  from '../../providers/search.service';
import { UserService }    from '../../providers/user.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'search-page',
  templateUrl: 'search-page.component.html',
  providers: [SearchService]
})
export class SearchPageComponent {
  currentDepots: Observable<DepotObject[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private navCtrl: NavController,
    private searchService: SearchService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ionViewDidLoad(): void {
    this.currentDepots = this.searchTerms
      .debounceTime(500)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(

        (term) => term   // switch to new observable each time the term changes
          // return the http search observable
          ? this.searchService.search(term)
          // or the observable of empty heroes if there was no search term
          : Observable.of<DepotObject[]>([]))

      .catch(error => {
        let jsonErr = error.json();

        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: jsonErr.message,
          position: 'bottom',
          duration: 4000,
          cssClass: 'toast-error'
        });
        toast.present();

        if (error.status === 401) {
          this.tokenErrorHandler();
        }

        return Observable.of<DepotObject[]>([]);
      });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
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

  /**
   * Navigate to the detail page for this item.
   */
  openItem(depotObject: DepotObject): void {
    this.navCtrl.push(DepotObjectsDetailPageComponent, {
      depotObject: depotObject
    });
  }

}
