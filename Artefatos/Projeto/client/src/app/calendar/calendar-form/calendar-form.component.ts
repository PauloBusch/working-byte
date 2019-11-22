import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';

import { GetCalendarQuery } from '../models/queries/getCalendarQuery';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { CalendarList } from '../models/view-models/calendar.list';
import { DataService } from 'src/app/shared/services/data.service';
import { Random } from 'src/app/shared/utils/random';
import { CreateCalendarCommand } from '../models/commands/createCalendarCommand';
import { UpdateCalendarCommand } from '../models/commands/updateCalendarCommand';
 
@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})

export class CalendarFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private random: Random,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private calendarService: CalendarService,
    private dataService: DataService<CalendarList>
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      datePicker:  ['', Validators.required],
      timeInitial: ['', Validators.required],
      timeEnd: ['', Validators.required]
      
    })
  }

  ngOnInit(){

  }

  loadData(params: { id:string }) {
    this.refId = params.id;
    if(!this.refId){
      this.isNew = true;
      return;
    }

    const query = new GetCalendarQuery(this.refId);
    this.calendarService.getCalendarById(query).subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Agendas não encontrada', 'OK', { duration: 3000 });
        return;
      }

      const Calendar = result.List[0];
      this.form.patchValue(Calendar);
    })
  }

  close() {
    this.bottomSheet.dismiss();
  }

  save() {
    if (this.form.invalid) {
      this.snackBar.open('Preencha os campos obrigatórios', 'OK', { duration: 3000 });
      return;
    }

    const value = this.form.value;
    if (this.isNew) {
      this.create(value);
    } else {
      this.update(value);
    }
  }

  private create(values: any) {
    this.refId = this.random.NewId();
    const command = new CreateCalendarCommand(
      this.refId,
      values.name,
      values.description,
      values.datePicker,
      values.timeInitial,
      values.timeEnd
    );

    this.calendarService.create(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Agenda Salva com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }

      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private update(values: any) {
    const command = new UpdateCalendarCommand(
      this.refId,
      values.name,
      values.description,
      values.datePicker,
      values.timeInitial,
      values.timeEnd
    );
    this.calendarService.update(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Agenda editada com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }
     
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private updateList(values: any) {
    const calendar = new CalendarList(
      this.refId,
      values.name,
      values.description,
      values.datePicker,
      values.timeInitial,
      values.timeEnd
    );
    this.dataService.update(calendar);

  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}