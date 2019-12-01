import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { from } from 'rxjs';

import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ListCalendarQuery } from '../models/queries/listCalendarQuery';
import { Storage } from 'src/app/shared/utils/storage';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CalendarList} from '../models/view-models/calendar.list';
import { RemoveCalendarCommand } from '../models/commands/removeCalendarCommand';
import { AppComponent } from 'src/app/app.component';
import { CalendarTrainingComponent } from '../calendar-training/calendar-training.component';
import { TrainingComponent } from 'src/app/trainings/training-form/training.component';
export interface DialogData {
  values: string;
  name: string;
}


@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  
  private listQuery: ListCalendarQuery;
  private calendars = new AsyncQuery<CalendarList>();
  private isPersonal: boolean;
  animal: string;
  name: string;

  displayedColumns: string[];
  dataSource: MatTableDataSource<CalendarList>;

  mostrarOption(){
    if(this.isPersonal){
      this.displayedColumns = [ 'data', 'hrInicio', 'training', 'option'];
    }else{
      this.displayedColumns = [ 'data', 'hrInicio', 'training'];
    }
  }

  constructor(
    private calendarService: CalendarService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<CalendarList>,
    private appComponent: AppComponent,
    public dialog: MatDialog
    ) {
      const limit = Storage.get('calendar.limit', 10);
      const page = Storage.get('calendar.page', 1);
      const sortAsc = Storage.get('calendar.sortAsc', false);
      const columnSort = Storage.get('calendar.columnSort', 'calendar_created');
      this.listQuery = new ListCalendarQuery(page, limit, sortAsc, columnSort);
      this.isPersonal = appComponent.currentUser.is_personal;
      this.mostrarOption();
   }

  ngOnInit() {
    this.loadCalendars();
    this.dataService.source.subscribe(calendars => this.pushCalendarList(calendars));
  }

  ngOnDestroy() {
    this.calendars.subsc.unsubscribe();
  }

  public pushCalendarList(calendar: CalendarList) {
    if (!calendar) {
      return;
    }

    const indexCalendar = this.calendars.list.findIndex(us => us.id === calendar.id);
    if (indexCalendar === -1) {
      this.calendars.list.unshift(calendar);
    } else {
      this.calendars.list[indexCalendar] = calendar;
    }
    this.dataSource = new MatTableDataSource<CalendarList>(this.calendars.list);
  }

  public removeCalendarList(id: string) {
    this.calendars.list = this.calendars.list.filter(us => us.id !== id);
  }

  loadCalendars() {
    this.calendars.$list = this.calendarService.getCalendar(this.listQuery);
    this.calendars.subsc = this.calendars.$list.subscribe(result => {
    this.dataSource = new MatTableDataSource<CalendarList>(result.List);
    });
    // this.calendars.$list = this.calendarService.getCalendar(this.listQuery);
    // this.calendars.subsc = this.calendars.$list.subscribe();

  }

  pageChange(ev: PageEvent) {
    this.listQuery.page = ev.pageIndex + 1;
    this.listQuery.limit = ev.pageSize;
    Storage.set('calendars.limit', this.listQuery.limit);
    Storage.set('calendars.page', this.listQuery.page);
    this.loadCalendars();
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o usuário?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveCalendarCommand(id);
      this.calendarService.removeCalendar(command).subscribe((result) => {
          if (result.Rows > 0) {
            this.snackBar.open('Agenda removida com sucesso!', 'OK', { duration: 3000 });
            this.removeCalendarList(id);
            return;
          }
          this.snackBar.open('Falha ao remover o usuário!', 'OK', { duration: 3000 });
        }
      );
    });
  }

  openDialog(value): void {
    const dialogRef = this.dialog.open(CalendarTrainingComponent, {
      height: '400px',
      width: '600px',
      data: {name: this.name, values: value}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      alert(this.animal);
    });
  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
