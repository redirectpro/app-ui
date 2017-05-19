import { Component, OnDestroy, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApplicationService } from '../../shared/application/application.service';
import { MdDialogRef } from '@angular/material';
import { RedirectModel } from '../shared/redirect.model';

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html',
  styleUrls: ['./redirect-form.component.css']
})
export class RedirectFormComponent {
  public myForm: FormGroup;
  public redirect: RedirectModel;

  constructor(
    public applicationService: ApplicationService,
    public formBuilder: FormBuilder,
    public dialogRef: MdDialogRef<RedirectFormComponent>,
    public renderer: Renderer
  ) {
    this.renderer.setElementClass(document.querySelector('md-dialog-container'), 'app-redirect-form', true);
    this.myForm = this.formBuilder.group({
      targetProtocol: ['http', [Validators.required]],
      targetHost: ['', [Validators.required]],
      hostSources: this.formBuilder.array([])
    });
    this.addSourceHost();
  }

  addSourceHost(value?: string) {
    const control = <FormArray>this.myForm.controls['hostSources'];
    const initHost = this.formBuilder.group({
      host: [(value || ''), [Validators.required]]
    });
    control.push(initHost);
  }

  removeSourceHost(i: number) {
    const control = <FormArray>this.myForm.controls['hostSources'];
    control.removeAt(i);
  }

  populate(redirect: RedirectModel) {
    this.redirect = redirect;
    this.myForm.controls['targetProtocol'].setValue(redirect.targetProtocol);
    this.myForm.controls['targetHost'].setValue(redirect.targetHost);

    if (redirect.hostSources.length > 0) {
      this.removeSourceHost(0);
    }

    for (const hostSource of redirect.hostSources) {
      this.addSourceHost(hostSource);
    }
  }

  transform(model) {
    const newModel: RedirectModel = {
      targetProtocol: model.targetProtocol,
      targetHost: model.targetHost,
      hostSources: []
    };

    for (const host of model.hostSources) {
      newModel.hostSources.push(host.host);
    }

    return newModel;
  }

  save(_model: Object, isValid: boolean) {
    const model: RedirectModel = this.transform(_model);
    if (isValid === true && this.redirect === undefined) {
      this.applicationService.redirect.postRedirect(model).then((data: RedirectModel) => {
        this.dialogRef.close(data);
      });
    } else if (isValid === true && this.redirect) {
      this.applicationService.redirect.putRedirect(this.redirect.id, model).then((data: RedirectModel) => {
        this.dialogRef.close(data);
      });
    }
  }

  /* --aot results: Property 'controls' does not exist on type 'AbstractControl'. */
  get getMyForm() { return <any>this.myForm.controls; }

}
