import { Component }     from '@angular/core';
import { NavController } from 'ionic-angular';

import { MembersPageComponent } from '../members/members-page.component';


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
  slides: Slide[] = [
    {
      title: 'TUTORIAL_SLIDE1_TITLE',
      description: 'TUTORIAL_SLIDE1_DESCRIPTION',
      image: 'assets/img/ica-slidebox-img-1.png',
    },
    {
      title: 'TUTORIAL_SLIDE2_TITLE',
      description: 'TUTORIAL_SLIDE2_DESCRIPTION',
      image: 'assets/img/ica-slidebox-img-2.png',
    },
    {
      title: 'TUTORIAL_SLIDE3_TITLE',
      description: 'TUTORIAL_SLIDE3_DESCRIPTION',
      image: 'assets/img/ica-slidebox-img-3.png',
    }
  ];
  showSkip = true;

  constructor(
    private navCtrl: NavController,
  ) { }

  startApp(): void {
    this.navCtrl.setRoot(MembersPageComponent, {}, {} );
  }

  onSlideChangeStart(slider): void {
    this.showSkip = !slider.isEnd();
  }

}
