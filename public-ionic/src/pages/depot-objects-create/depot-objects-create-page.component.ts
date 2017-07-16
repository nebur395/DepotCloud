import { Component, ViewChild }               from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, ViewController }          from 'ionic-angular';

import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'depot-objects-create-page',
  templateUrl: 'depot-objects-create-page.component.html'
})
export class DepotObjectsCreatePageComponent {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private nameParam: NavParams
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      image: [''],
      guarantee: [''],
      dateOfExpiry: [''],
      description: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (nameParam.get('depotObject')) {
      this.form.setValue({
        name: nameParam.get('depotObject').name,
        guarantee: nameParam.get('depotObject').guarantee,
        dateOfExpiry: nameParam.get('depotObject').dateOfExpiry,
        image: nameParam.get('depotObject').image,
        description: nameParam.get('depotObject').description
      });
    }
  }

  ionViewDidLoad() {

  }

  getImage() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((imageBase64) => {
        this.form.patchValue({
          image: imageBase64
        });
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let data_url = (readerEvent.target as any).result;
      let imageData = data_url.split(',')[1];

      this.form.patchValue({
        image: imageData
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(data:image/png;base64,' + this.form.controls['image'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
