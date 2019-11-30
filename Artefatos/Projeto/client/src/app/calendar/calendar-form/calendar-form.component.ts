import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';

import { GetCalendarQuery } from '../models/queries/getCalendarQuery';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { CalendarList } from '../models/view-models/calendar.list';
import { DataService } from 'src/app/shared/services/data.service';
import { Random } from 'src/app/shared/utils/random';
import { CreateCalendarCommand } from '../models/commands/createCalendarCommand';
import { UpdateCalendarCommand } from '../models/commands/updateCalendarCommand';
import { ListCalendarQuery } from '../models/queries/listCalendarQuery';
import { ListCalendarTrainingQuery } from '../models/queries/listCalendarTrainingQuery';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Training } from 'src/app/trainings/models/training.model';
import { CalendarTrainingList } from '../models/view-models/calendarTraining.list';
 
@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})

export class CalendarFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;
  private listQuery: ListCalendarQuery;
  myControl = new FormControl();

  options: CalendarTrainingList[] = [
    {id:'1',name: 'Mary', description:''},
    {id:'2',name: 'joana', description:''},
    {id:'1',name: 'josué', description:''}
  ];
  filteredOptions: Observable<CalendarTrainingList[]>;

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
      training: ['', Validators.required],
      date:  ['', Validators.required],
      timeInitial: ['', Validators.required],
      timeEnd: ['', Validators.required]
      
    })
  }

  displayFn(user?: CalendarTrainingList): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): CalendarTrainingList[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.id.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
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
      Calendar.training = Calendar.training.name;
      this.form.patchValue(Calendar);
    })
  }

  loadTraining() {
    this.calendarService.getTraining(this.listQuery).subscribe(result => {
      if(!result){
        return null;
      }else{
        return result;
      }
    });
  }

  loadTrainings() {
    const queryTraining = new ListCalendarQuery();
    this.calendarService.getTraining(queryTraining).subscribe(result => {
      this.training = result.List;
    });
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
      values.training.id,
      values.date,
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
      values.training.id,
      values.date,
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
      values.training.id,
      values.date,
      values.timeInitial,
      values.timeEnd
    );
    this.dataService.update(calendar);

  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}