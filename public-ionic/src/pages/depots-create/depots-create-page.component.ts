import { Component, ViewChild }                 from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { NavParams, ViewController }            from 'ionic-angular';

@Component({
  selector: 'depots-create-page',
  templateUrl: 'depots-create-page.component.html'
})
export class DepotsCreatePageComponent {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      location: [''],
      type: ['', Validators.required],
      distance: ['', Validators.required],
      description: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('depot')) {
      this.form.setValue({
        name: this.nameParam.get('depot').name,
        location: this.nameParam.get('depot').location,
        type: this.nameParam.get('depot').type,
        distance: this.nameParam.get('depot').distance,
        description: this.nameParam.get('depot').description
      });
    }
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
