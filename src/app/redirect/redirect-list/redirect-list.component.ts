import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { EventEmitter } from 'events';
import { DialogService } from '../../shared/dialog/dialog.service';
import { MdDialog } from '@angular/material';
import { RedirectFormComponent } from '../redirect-form/redirect-form.component';
import { RedirectFromToComponent } from '../redirect-from-to/redirect-from-to.component';
import { RedirectModel } from '../shared/redirect.model';

@Component({
  selector: 'app-redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {
  listRedirect: Array<RedirectModel>;
  event: EventEmitter = new EventEmitter();

  constructor(
    public applicationService: ApplicationService,
    public dialogService: DialogService,
    public dialog: MdDialog
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
    this.applicationService.redirect.getRedirects().then((data: Array<RedirectModel>) => {
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

  openForm(redirect?: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFormComponent);

    dialogRef.afterClosed().subscribe((result: RedirectModel) => {
      console.log('update list');
      this.updateList(result);
    });

    if (redirect) {
      dialogRef.componentInstance.setRedirect(redirect);
    }
  }

  openFromTo(redirect: RedirectModel) {
    const dialogRef = this.dialog.open(RedirectFromToComponent);
    dialogRef.componentInstance.redirect = redirect;
  }

  updateList(result: RedirectModel) {
    if (!result) { return false; }
    const update = this.listRedirect.find((e: RedirectModel) => {
      return (e.id === result.id);
    });

    if (update) {
      this.listRedirect.map((e: RedirectModel) => {
        if (e.id === result.id) { Object.assign(e, result); }
        return e;
      });
    } else {
      this.listRedirect.push(result);
    }
  }

}
