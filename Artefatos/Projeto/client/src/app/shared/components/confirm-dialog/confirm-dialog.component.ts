import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;

  public buttonOk = 'OK';
  public buttonCancel = 'CANCELAR';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
