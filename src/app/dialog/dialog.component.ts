import { Component, OnInit, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public title: String;
  public message: String = 'Default message';
  public confirmText: String = 'Yes';
  public declineText: String = 'No';
  public onDecline = new EventEmitter();
  public onConfirm = new EventEmitter();

  constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  onConfirmClicked() {
    this.onConfirm.emit();
    this.dialogRef.close();
  }

  onDeclaneClicked() {
    this.onDecline.emit();
    this.dialogRef.close();
  }

}
