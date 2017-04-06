import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../application/application.service';
import { EventEmitter } from 'events';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {
  listRedirect: Array<Object>;
  event: EventEmitter = new EventEmitter();

  constructor(
    public applicationService: ApplicationService,
    public dialogService: DialogService
  ) {
    this.event.on('ready', () => {
      this.getRedirectList();
    });
  }

  ngOnInit() {
    if (this.applicationService.ready === true) {;
      this.event.emit('ready', true);
    } else {
      this.applicationService.event.on('ready', () => {
        this.event.emit('ready', true);
      });
    }
  }

  getRedirectList() {
    this.applicationService.redirect.getRedirects().then((data: Array<Object>) => {
      this.listRedirect = data;
    });
  }

  deleteRedirect(redirectId: String, target: String) {
    const dialogParams = {
      title: 'Deleting redirect',
      declineText: 'Cancel',
      confirmText: 'Yes',
      message: `Do you want to delete redirect to target ${target}?`
    };

    this.dialogService.confirm(dialogParams).then((confirmed) => {
      if (confirmed === true) {
        this.applicationService.redirect.deleteRedirect(redirectId).then(() => {
          this.listRedirect = this.listRedirect.filter(e => e['id'] !== redirectId);
        });
      }
    });
  }
}
