import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Training } from '../models/training.model';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { Random } from 'src/app/shared/utils/random';
import { TrainingList } from '../models/view-models/training.list';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { UpdateTrainingCommand } from '../models/commands/updateTrainingCommand';
import { CreateTrainingCommand } from '../models/commands/createTrainingCommand';
import { ListTrainingExerciseQuery } from '../models/queries/listTrainingExerciseQuery';
import { GetTrainingQuery } from '../models/queries/getTrainingQuery';
import { startWith, map } from 'rxjs/operators';
import { TrainingExerciseList } from '../models/view-models/trainingExercise.list';
import { DataService } from 'src/app/shared/services/data.service';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  private isNew: boolean;
  private refId: string;
  private listQuery: ListTrainingExerciseQuery;

  options: TrainingExerciseList[];
  filteredOptions: Observable<TrainingExerciseList[]>;

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private random: Random,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private trainingService: TrainingService,
    private dataService: DataService<TrainingList>
    
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      exercise: ['', Validators.required],
      date:  ['', Validators.required],
      timeInitial: ['', Validators.required],
      timeEnd: ['', Validators.required]
      
    });
    this.loadExercise();
  }

  displayFn(user?: TrainingExerciseList): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): TrainingExerciseList[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){
 
 
    
  }

  filterTraining(){
    this.filteredOptions = this.form.controls.training.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  loadData(params: { id:string }) {
    this.refId = params.id;
  
    if(!this.refId){
      this.isNew = true;
      return;
    }

    const query = new GetTrainingQuery(this.refId);
    this.trainingService.getTrainingById(query).subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Agendas não encontrada', 'OK', { duration: 3000 });
        return;
      }

      const Training = result.List[0];

      this.form.patchValue(Training);
      this.loadExercise();
    })
  }

  loadExercise() {
     const queryExercise = new ListTrainingExerciseQuery();
     this.trainingService.getExercise(queryExercise).subscribe(result => {
      this.options = result.List;
      this.filterTraining();
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

    this.trainingService.create(command).subscribe(result => {
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
    this.trainingService.update(command).subscribe(result => {
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
    const training = new TrainingList(
      this.refId,
      values.name,
      values.training,
      values.date,
      values.timeInitial,
      values.timeEnd
    );
    this.dataService.update(training);

  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}