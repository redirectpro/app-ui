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
  settings: Object;
  data: Array<Object>;

  constructor(public applicationService: ApplicationService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    setTimeout(() => { this.getFromToData(); }, 300);

    this.settings = {
      columns: {
        from: { title: 'From' },
        to: { title: 'To' }
      }
    };

  }

  getFromToData() {
    this.data = null;
    this.applicationService.redirect.getFromTo(this.redirect.id).then((data) => {
      this.checkFromToJob(data['queue'], data['jobId']);
    });
  }

  checkFromToJob(queue, jobId) {
    console.log(1)
    this.applicationService.redirect.getJob(this.redirect.id, queue, jobId).then((data) => {
      if (data['progress'] < 100) {
        setTimeout(() => { this.checkFromToJob(queue, jobId); }, 1000);
      } else if (data['returnValue']) {
        this.applicationService.getContent(data['returnValue']['objectLink']).then((dataLink: Array<Object>) => {
          this.data = dataLink;
        });
      }
    });
  }

  setRequired() {
    this.myInputFileSetted = true;
  }

  uploadFile(filex) {
    const fileList: FileList = this.myInputFile.nativeElement.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.jobFailedReason = null;
      this.applicationService.redirect.postFromTo(this.redirect.id, file).then((data) => {
        this.myInputFile.nativeElement.value = '';
        this.myInputFileSetted = false;
        this.jobId = data['jobId'];
        this.checkUploadFileJob(data['queue']);
        this.snackBar.open('Your file is being processed.', 'CLOSE', { duration: 5000 });
      });
    }
  }

  checkUploadFileJob(queue) {
    this.applicationService.redirect.getJob(this.redirect.id, queue, this.jobId).then((data) => {
      this.jobProgress = data['progress'];
      if (this.jobProgress < 100 && !data['failedReason']) {
        setTimeout(() => { this.checkUploadFileJob(queue); }, 3000);
      } else if (data['failedReason']) {
        this.jobFailedReason = data['failedReason'];
        this.jobId = null;
      } else {

        if (this.jobProgress === 100) {
          this.getFromToData();
          this.snackBar.open('Your file has been processed.', 'CLOSE', { duration: 5000 });
        }

        setTimeout(() => {
          this.jobId = null;
        }, 5000);
      }
    });
  }

}
