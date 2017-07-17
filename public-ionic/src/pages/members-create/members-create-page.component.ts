import { Component, ViewChild }                 from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { NavParams, ViewController }            from 'ionic-angular';


@Component({
  selector: 'members-create-page',
  templateUrl: 'members-create-page.component.html'
})
export class MemberCreatePageComponent {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('memberName')) {
      this.form.setValue({name: this.nameParam.get('memberName')});
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
    this.viewCtrl.dismiss(this.form.value.name);
  }
}
