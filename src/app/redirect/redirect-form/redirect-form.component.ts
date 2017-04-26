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

  // getRedirect() {
  //   this.applicationService.redirect.getRedirect(this.redirectId).then((data: RedirectModel) => {
  //     this.myForm.controls['targetProtocol'].setValue(data.targetProtocol);
  //     this.myForm.controls['targetHost'].setValue(data.targetHost);

  //     if (data['hostSources'].length > 0) {
  //       this.removeSourceHost(0);
  //     }

  //     for (const hostSource of data.hostSources) {
  //       this.addSourceHost(hostSource);
  //     }
  //   });
  // }

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

  // fileChange(event) {
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     const file: File = fileList[0];
  //     this.jobFailedReason = null;
  //     this.applicationService.redirect.postUpload(this.redirectId, file).then((data) => {
  //       this.jobId = data['jobId'];
  //       this.checkJob();
  //     });
  //   }
  // }

  // checkJob() {
  //   this.applicationService.redirect.getUploadJob(this.redirectId, this.jobId).then((data) => {
  //     console.log(data);
  //     this.jobProgress = data['progress'];
  //     if (this.jobProgress < 100 && !data['failedReason']) {
  //       setTimeout(() => { this.checkJob(); }, 3000);
  //     } else if (data['failedReason']) {
  //       this.jobFailedReason = data['failedReason'];
  //       this.jobId = null;
  //     } else {
  //       setTimeout(() => { this.jobId = null; }, 10000);
  //     }
  //   });
  // }
}
