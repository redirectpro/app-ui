import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { RedirectModel } from '../shared/redirect.model';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-redirect-from-to',
  templateUrl: './redirect-from-to.component.html',
  styleUrls: ['./redirect-from-to.component.css']
})
export class RedirectFromToComponent implements OnInit {
  @ViewChild('inputFile') myInputFile: any;
  myInputFileSetted: Boolean = false;
  redirect: RedirectModel;
  jobId: String;
  jobProgress: Number;
  jobFailedReason: String;

  constructor(public applicationService: ApplicationService, public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  setRequired() {
    this.myInputFileSetted = true;
  }

  uploadFile(filex) {
    const fileList: FileList = this.myInputFile.nativeElement.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.jobFailedReason = null;
      this.applicationService.redirect.postUpload(this.redirect.id, file).then((data) => {
        this.myInputFile.nativeElement.value = '';
        this.myInputFileSetted = false;
        this.jobId = data['jobId'];
        this.checkJob();
        this.snackBar.open('Your file is being processed.', 'CLOSE', { duration: 5000 });
      });
    }
  }

  checkJob() {
    this.applicationService.redirect.getUploadJob(this.redirect.id, this.jobId).then((data) => {
      console.log(data);
      this.jobProgress = data['progress'];
      if (this.jobProgress < 100 && !data['failedReason']) {
        setTimeout(() => { this.checkJob(); }, 3000);
      } else if (data['failedReason']) {
        this.jobFailedReason = data['failedReason'];
        this.jobId = null;
      } else {

        if (this.jobProgress === 100) {
          this.snackBar.open('Your file has been processed.', 'CLOSE', { duration: 5000 });
        }

        setTimeout(() => {
          this.jobId = null;
        }, 5000);
      }
    });
  }

}
