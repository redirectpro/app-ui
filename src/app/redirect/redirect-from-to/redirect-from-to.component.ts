import { Component, OnInit, OnDestroy, ViewChild, Renderer } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { RedirectModel } from '../shared/redirect.model';
import { MdSnackBar } from '@angular/material';
import { LocalDataSource } from 'ng2-smart-table';
import json2csv from 'json2csv/lib/json2csv';

@Component({
  selector: 'app-redirect-from-to',
  templateUrl: './redirect-from-to.component.html',
  styleUrls: ['./redirect-from-to.component.css']
})
export class RedirectFromToComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile') myInputFile: any;
  myInputFileSetted: Boolean = false;
  redirect: RedirectModel;
  jobId: String;
  settings: Object;
  source: LocalDataSource;
  isDestroyed: Boolean = false;
  isReady: Boolean = false;

  constructor(
    public applicationService: ApplicationService,
    public snackBar: MdSnackBar,
    public renderer: Renderer
  ) {
    this.renderer.setElementClass(document.querySelector('md-dialog-container'), 'app-redirect-from-to', true);
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    setTimeout(() => { this.getFromTo(); }, 150);

    this.settings = {
      columns: {
        from: {
          title: 'From',
          filter: false
        },
        to: {
          title: 'To',
          filter: false
        }
      }
    };

  }

  ngOnDestroy() {
    this.isDestroyed = true;
  }

  getFromTo() {
    this.isReady = false;
    this.source.load([]);
    this.applicationService.redirect.getFromTo(this.redirect.id).then((data) => {
      setTimeout(() => {
        this.checkFromToJob(data['queue'], data['jobId']);
      }, 500);
    });
  }

  onClickUploadFile() {
    this.myInputFile.nativeElement.click();
  }

  onChangeUploadFile() {
    this.myInputFileSetted = true
    const fileList: FileList = this.myInputFile.nativeElement.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.isReady = false;
      this.applicationService.redirect.postFromTo(this.redirect.id, 'file', file).then((data) => {
        this.myInputFile.nativeElement.value = '';
        this.myInputFileSetted = false;
        this.jobId = data['jobId'];
        this.checkUploadFileJob(data['queue']);
        this.snackBar.open('Your file is being processed.', 'CLOSE', { duration: 5000 });
      });
    }
  }

  saveTable() {
    const jsonData = this.source['data'];
    this.isReady = false;
    this.applicationService.redirect.postFromTo(this.redirect.id, 'json', jsonData).then((data) => {
      this.jobId = data['jobId'];
      this.checkUploadFileJob(data['queue']);
    });
  }

  checkFromToJob(queue, jobId) {
    if (this.isDestroyed === true) { return false; }

    this.applicationService.redirect.getJob(this.redirect.id, queue, jobId).then((data) => {
      if (data['progress'] === 100 && data['returnValue']) {
        this.applicationService.getContent(data['returnValue']['objectLink']).then((dataLink: Array<Object>) => {
          this.source.load(dataLink);
          this.isReady = true;
        });
      } else if (data['progress'] === 100 && data['failedReason']) {
        this.isReady = true;
        // nothing
      } else if (data['failedReason']) {
        this.isReady = true;
        this.snackBar.open(data['failedReason'], 'CLOSE', { duration: 5000 });
      } else if (data['progress'] < 100) {
        setTimeout(() => { this.checkFromToJob(queue, jobId); }, 1000);
      }
    });
  }

  checkUploadFileJob(queue) {
    if (this.isDestroyed === true) { return false; }

    this.applicationService.redirect.getJob(this.redirect.id, queue, this.jobId).then((data) => {
      if (data['progress'] < 100 && !data['failedReason']) {
        setTimeout(() => { this.checkUploadFileJob(queue); }, 3000);
      } else if (data['failedReason']) {
        this.isReady = true;
        this.jobId = null;
        this.snackBar.open(data['failedReason'], 'CLOSE', { duration: 5000 });
        
      } else {

        if (data['progress'] === 100) {
          this.getFromTo();
          this.snackBar.open('Your file has been processed.', 'CLOSE', { duration: 5000 });
        }

        this.jobId = null;
      }
    });
  }

  downloadFile() {
    const fields = ['from', 'to'];
    const data = json2csv({ data: this.source['data'], fields: fields });
    const csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'});
    const csvURL = window.URL.createObjectURL(csvData);
    const filename = `${this.redirect.targetHost.replace(/\./g, '-')}-${new Date().getTime()}` + '.csv';
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', filename);
    tempLink.click();
  }
}
