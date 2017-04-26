import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { EventEmitter } from 'events';
import { DialogService } from '../../shared/dialog/dialog.service';
import { MdDialog } from '@angular/material';
import { RedirectFormComponent } from '../redirect-form/redirect-form.component';
import { RedirectFromToComponent } from '../redirect-from-to/redirect-from-to.component';
import { RedirectModel } from '../shared/redirect.model';
import { RedirectListService } from './redirect-list.service';

@Component({
  selector: 'app-redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {
  service: RedirectListService;
  event: EventEmitter = new EventEmitter();

  constructor(
    public applicationService: ApplicationService,
    public dialogService: DialogService,
    public dialog: MdDialog
  ) {
    this.service = new RedirectListService(applicationService);
  }

  ngOnInit() {
    this.event.on('ready', () => {
      this.service.populate();
    });

    if (this.applicationService.ready === true) {;
      this.event.emit('ready', true);
    } else {
      this.applicationService.event.on('ready', () => {
        this.event.emit('ready', true);
      });
    }
  }

  delete(redirect: RedirectModel) {
    const dialogParams = {
      title: 'Deleting redirect',
      declineText: 'Cancel',
      confirmText: 'Yes',
      message: `Do you want to delete redirect to target ${redirect.targetHost}?`
    };

    this.dialogService.confirm(dialogParams).then((confirmed) => {
      if (confirmed === true) {
        this.service.delete(redirect);
      }
    });
  }

  openForm(redirect?: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFormComponent);

    dialogRef.afterClosed().subscribe((result: RedirectModel) => {
      if (result) { this.service.assign(result); }
    });

    if (redirect) {
      dialogRef.componentInstance.setRedirect(redirect);
    }
  }

  openFromTo(redirect: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFromToComponent);
    dialogRef.componentInstance.redirect = redirect;
  }

}
