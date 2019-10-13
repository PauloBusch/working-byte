import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  public confirmRemove(message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Remover esse registro';
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.buttonOk = 'REMOVER';

    return dialogRef.afterClosed();
  }
}
