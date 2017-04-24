import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {

  constructor(public dialog: MdDialog) { }

  private showDialog(config) {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.componentInstance.title = config.title;
      dialogRef.componentInstance.message = config.message;
      dialogRef.componentInstance.confirmText = config.confirmText;
      dialogRef.componentInstance.declineText = config.declineText;

      const confirm = dialogRef.componentInstance.onConfirm.subscribe(() => {
        resolve(true);
      });

      const decline = dialogRef.componentInstance.onDecline.subscribe(() => {
        resolve(false);
      });

      dialogRef.afterClosed().subscribe(result => {
        confirm.unsubscribe();
        decline.unsubscribe();
      });
    });
  }

  public alert(dialogParams) {
    delete dialogParams.declineText;
    return new Promise((resolve, reject) => {
      this.showDialog(dialogParams).then((confirmed) => resolve());
    });
  }

  public confirm(dialogParams) {
    return new Promise((resolve, reject) => {
      this.showDialog(dialogParams).then((confirmed) => resolve(confirmed));
    });
  }

}
