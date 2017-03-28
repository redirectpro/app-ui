import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.type = 'confirm';

    const confirmSub = dialogRef.componentInstance.onConfirm.subscribe(() => {
      console.log('confirmed!');
    });

    const cancelSub = dialogRef.componentInstance.onCancel.subscribe(() => {
      console.log('cancelled!');
    });

    dialogRef.afterClosed().subscribe(result => {
      confirmSub.unsubscribe();
      cancelSub.unsubscribe();
    });
  }
}
