import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApplicationService } from '../../shared/application/application.service';
import { EventEmitter } from 'events';
import { MdDialogRef } from '@angular/material';
import { RedirectModel } from '../shared/redirect.model';

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html',
  styleUrls: ['./redirect-form.component.css']
})
export class RedirectFormComponent implements OnInit {
  public myForm: FormGroup;
  // redirect: Redirect;
  redirectId: String;
  // // jobId: String;
  // // jobProgress: Number;
  // // jobFailedReason: String;
  // event: EventEmitter = new EventEmitter();

  constructor(
    public applicationService: ApplicationService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialogRef: MdDialogRef<RedirectFormComponent>
  ) {
    this.myForm = this.formBuilder.group({
      targetProtocol: ['', [Validators.required]],
      targetHost: ['', [Validators.required]],
      hostSources: this.formBuilder.array([])
    });

    this.addSourceHost();
  }

  ngOnInit() {
  }

  addSourceHost(value?: string) {
    const control = <FormArray>this.myForm.controls['hostSources'];
    const initHost = this.formBuilder.group({
      host: [value, Validators.required]
    });
    control.push(initHost);
  }

  removeSourceHost(i: number) {
    const control = <FormArray>this.myForm.controls['hostSources'];
    control.removeAt(i);
  }

  setRedirect(redirect: RedirectModel) {
    this.redirectId = redirect.id;
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

    if (isValid === true && this.redirectId === undefined) {
      this.applicationService.redirect.postRedirect(model).then((data: RedirectModel) => {
        this.dialogRef.close(data);
        console.log('created');
      });
    } else if (isValid === true && this.redirectId) {
      this.applicationService.redirect.putRedirect(this.redirectId, model).then((data: RedirectModel) => {
        this.dialogRef.close(data);
        console.log('updated!');
      });
    }
  }

}
