import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Random } from 'src/app/shared/utils/random';
import { MatSnackBar, MatBottomSheet, MatDialog, MatTableDataSource } from '@angular/material';
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
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { TrainingExerciseDetails } from '../models/view-models/trainingExercise.details';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { Alert } from 'selenium-webdriver';
import { CreateTrainingExerciseCommand } from '../models/commands/createTrainingExerciseCommand';
export interface DialogData {
  values: string;
  name: string;
}

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {
  private isNew: boolean;
  private refId : string;
  private listQuery: ListTrainingQuery;
  private exercises = new AsyncQuery<TrainingExerciseDetails>();
  options: TrainingExerciseList[];
  filteredExercise: Observable<TrainingExerciseList[]>;
  displayedColumns: string[] = ['delete', 'name', 'description', 'edit'];
  dataSource: MatTableDataSource<TrainingExerciseDetails>;

  private form: FormGroup;
  objt: any;
  datas: any = "Teste"
  constructor(
    
    public dialog: MatDialog,
    private fb: FormBuilder,
    private random: Random,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private trainingService: TrainingService,
    private dataService: DataService<TrainingList>,
    private dataServiceTE: DataService<TrainingExerciseDetails[]>

  ) {

  
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]

      
    });
   }
   private _filterExercise(name: string): TrainingExerciseList[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(){

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
    this.trainingService.getTrainingById(query).subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Agendas não encontrada', 'OK', { duration: 3000 });
        return;
      }

      const Training = result.List[0];
      this.loadExercise();
      this.form.patchValue(Training);
  
    })
  }

  loadExercise() {
    // this.training.$list = this.trainingService.getTraining(this.listQuery);
    // this.training.subsc = this.training.$list.subscribe(result => {
    // this.dataSource = new MatTableDataSource<TrainingList>(result.List);
    // });


    const query = new GetTrainingQuery(this.refId);
    this.exercises.$list = this.trainingService.getExerciseByIdTraining(query);
    this.exercises.subsc = this.exercises.$list.subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Não possui exercicios', 'OK', { duration: 3000 });
        return;
      }
      
      this.dataSource =  new MatTableDataSource<TrainingExerciseDetails>(result.List);
      alert(result.List[1].name);
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
      values.description
    );

    this.trainingService.create(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Agenda Salva com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.createExercise();
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

  private createExercise(){
    for(let commandExercise of this.exercises.list){
      commandExercise.id_training = this.refId;
      const exerciseComannd = new CreateTrainingExerciseCommand(
        commandExercise.id,
        commandExercise.name,
        commandExercise.description,
        commandExercise.id_training,
        commandExercise.id_equipment,
        commandExercise.repetition,
        commandExercise.charge,
        commandExercise.sessions
      );
      //commandExercise.id_training = "2";
      this.trainingService.createExercise(exerciseComannd).subscribe();
    }
  }

  private update(values: any) {
    const command = new UpdateTrainingCommand(
      this.refId,
      values.name,
      values.description
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
    const trainings = new TrainingList(
      this.refId,
      values.name,
      values.description
    );
    this.dataService.update(trainings);


  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }


  openDialog(): void {
    
    
    const dialogRef = this.dialog.open(ExerciseFormComponent, {
      height: '500px',
      width: '600px',
      data:  TrainingExerciseDetails
    });
    dialogRef.beforeClosed().subscribe(result => {
      
      result.id = this.random.NewId();
      this.exercises.list.push(result);
      alert(this.exercises.list[0].sessions);
      this.dataSource =  new MatTableDataSource<TrainingExerciseDetails>(this.exercises.list);

      console.log('The dialog was closed');

    });

  }



}