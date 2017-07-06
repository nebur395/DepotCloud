import { Component }     from '@angular/core';
import { NavController } from 'ionic-angular';

import { DepotsPageComponent } from '../depots/depots-page.component';

import { TranslateService } from '@ngx-translate/core';



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'tutorial-page',
  templateUrl: 'tutorial-page.component.html'
})
export class TutorialPageComponent {
  slides: Slide[];
  showSkip = true;

  constructor(
    private navCtrl: NavController,
    translate: TranslateService
  ) {
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });
  }

  startApp(): void {
    this.navCtrl.setRoot(DepotsPageComponent, {}, {} );
  }

  onSlideChangeStart(slider): void {
    this.showSkip = !slider.isEnd();
  }

}
