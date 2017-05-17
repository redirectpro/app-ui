import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { EventEmitter } from 'events';
import { DialogService } from '../../shared/dialog/dialog.service';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
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
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
    this.service = new RedirectListService(applicationService);
  }

  ngOnInit() {

    this.applicationService.isReady.subscribe(
      value => this.service.populate()
    );

  }

  delete(redirect: RedirectModel) {
    const dialogParams = {
      title: 'Delete confirmation',
      declineText: 'Cancel',
      confirmText: 'Yes, delete it!',
      message: `Do you want to delete your redirect to the target <strong>${redirect.targetHost}</strong>?`
    };

    this.dialogService.confirm(dialogParams).then((confirmed) => {
      if (confirmed === true) {
        this.service.delete(redirect);
        this.snackBar.open('Redirect has been deleted.', 'CLOSE', { duration: 5000 });
      }
    });
  }

  openForm(redirect?: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFormComponent);

    dialogRef.afterClosed().subscribe((result: RedirectModel) => {
      if (result) {
        const r = this.service.assign(result);
        if (r.added) {
          this.snackBar.open('Redirect has been added.', 'CLOSE', { duration: 5000 });
        } else if (r.updated) {
          this.snackBar.open('Redirect has been updated.', 'CLOSE', { duration: 5000 });
        }
      }
    });

    if (redirect) {
      dialogRef.componentInstance.populate(redirect);
    }
  }

  openFromTo(redirect: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFromToComponent);
    dialogRef.componentInstance.redirect = redirect;
  }

}
