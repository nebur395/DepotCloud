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
      title: 'Bienvenido a Depot Cloud',
      description: 'Depot Cloud es un sistema de gestión de viviendas, trasteros y armarios orientado a las unidades familiares.',
      image: 'assets/img/ica-slidebox-img-1.png',
    },
    {
      title: 'Cómo empezar a usar Depot Cloud',
      description: 'Primero has de registrar una cuenta para después poder iniciar sesión. A continuación, has de crear algunos miembros (personas) dentro de la cuenta.',
      image: '../../assets/images/slide_2.png',
    },
    {
      title: 'Identifícate dentro de la cuenta',
      description: 'Para identificarte has de clicar en uno de los miembros. Si desplazas alguno con el dedo aparecen opciones de modificar y borrar.',
      image: '../../assets/images/slide_2.png',
    },
    {
      title: 'Crea tu primer almacén',
      description: 'Ve al menú de almacenes y crea tu primer almacén rellenando el formulario. Si desplazas alguno con el dedo aparecen opciones de modificar y borrar.',
      image: '../../assets/images/slide_3.png',
    },
    {
      title: 'Crea tu primer objeto',
      description: 'Entra en uno de los almacenes ya creados pudiendo crear objetos y viendo los ya existentes que pertenezcan a él. Si desplazas alguno con el dedo aparecen opciones de modificar y borrar.',
      image: '../../assets/images/slide_4.png',
    },
    {
      title: 'Visualiza la actividad y los informes',
      description: 'Si vas a la pantalla de actividades podrás ver la actividad de toda la cuenta. Si vas a la pantalla de informes podrás ver recomendaciones para tu cuenta de los objetos de la misma.',
      image: '../../assets/images/slide_5.png',
    },
    {
      title: 'Busca objetos',
      description: 'Para poder encontrar un objeto rápidamente, ve a la pantalla de búsqueda e introduce el objeto que desees buscar.',
      image: '../../assets/images/slide_6.png',
    },
    {
      title: 'Editar tu cuenta',
      description: 'Por último, si deseas editar el nombre de tu cuenta, la contraseña, o borrarla, ve a la pantalla de opciones.',
      image: '../../assets/images/slide_7.png',
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
