import { Component, OnInit, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public title: String = 'Default title';
  public type: String = 'alert';
  public message: String = 'Default message';
  public onCancel = new EventEmitter();
  public onConfirm = new EventEmitter();

  constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  onConfirmClicked() {
    this.onConfirm.emit();
    this.dialogRef.close();
  }

  onCancelClicked() {
    this.onCancel.emit();
    this.dialogRef.close();
  }

}
