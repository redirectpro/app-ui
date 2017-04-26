import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { RedirectModel } from '../shared/redirect.model';

@Component({
  selector: 'app-redirect-from-to',
  templateUrl: './redirect-from-to.component.html',
  styleUrls: ['./redirect-from-to.component.css']
})
export class RedirectFromToComponent implements OnInit {
  redirect: RedirectModel;
  jobId: String;
  jobProgress: Number;
  jobFailedReason: String;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.jobFailedReason = null;
      this.applicationService.redirect.postUpload(this.redirect.id, file).then((data) => {
        this.jobId = data['jobId'];
        this.checkJob();
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
        setTimeout(() => { this.jobId = null; }, 10000);
      }
    });
  }

}
