import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Random } from 'src/app/shared/utils/random';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { TrainingService } from 'src/app/shared/services/training.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TrainingList } from '../models/view-models/training.list';
import { ListTrainingQuery } from '../models/queries/ListTrainingQuery';
import { TrainingExerciseList } from '../models/view-models/trainingExercise.list';
import { Observable } from 'rxjs';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { UpdateTrainingCommand } from '../models/commands/updateTrainingCommand';
import { CreateTrainingCommand } from '../models/commands/createTrainingCommand';
import { ListTrainingExerciseQuery } from '../models/queries/ListTrainingExerciseQuery';
import { GetTrainingQuery } from '../models/queries/GetTrainingQuery';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;
  private listQuery: ListTrainingQuery;

  options: TrainingExerciseList[];
  filteredExercise: Observable<TrainingExerciseList[]>;

  private form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private random: Random,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private calendarService: TrainingService,
    private dataService: DataService<TrainingList>

  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      training: ['', Validators.required],
      date:  ['', Validators.required],
      timeInitial: ['', Validators.required],
      timeEnd: ['', Validators.required]
      
    });
    this.loadExercise();
   }
   private _filterExercise(name: string): TrainingExerciseList[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){
    this.loadExercise();

  }

  filterExerciseOption(){
    this.filteredExercise = this.form.controls.training.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterExercise(value))
    );
  }

  loadData(params: { id:string }) {
    this.refId = params.id;
  
    if(!this.refId){
      this.isNew = true;
      return;
    }

    const query = new GetTrainingQuery(this.refId);
    this.calendarService.getTrainingById(query).subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Agendas não encontrada', 'OK', { duration: 3000 });
        return;
      }

      const Calendar = result.List[0];

      this.form.patchValue(Calendar);
      this.loadExercise();
    })
  }

  loadExercise() {

     const queryTrainingExe = new ListTrainingExerciseQuery();
     this.calendarService.getExercise(queryTrainingExe).subscribe(result => {
      this.options = result.List;
      
      this.filterExerciseOption();
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
    const command = new CreateTrainingCommand(
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
    const command = new UpdateTrainingCommand(
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
    const calendar = new TrainingList(
      this.refId,
      values.name,
      values.training
    );
    this.dataService.update(calendar);

  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}