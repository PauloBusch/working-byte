import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarListComponent, DialogData } from '../calendar-list/calendar-list.component';


@Component({
  selector: 'app-calendar-training',
  templateUrl: './calendar-training.component.html',
  styleUrls: ['./calendar-training.component.scss']
})
export class CalendarTrainingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CalendarListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
