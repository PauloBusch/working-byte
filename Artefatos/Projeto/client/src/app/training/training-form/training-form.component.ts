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
import { UpdateTrainingExerciseCommand } from '../models/commands/updateTrainingExerciseCommand';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';

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
    private dataServiceTE: DataService<TrainingExerciseDetails[]>,
    private confirmDialogService: ConfirmDialogService,
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
    const query = new GetTrainingQuery(this.refId);
    this.exercises.$list = this.trainingService.getExerciseByIdTraining(query);
    this.exercises.subsc = this.exercises.$list.subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Não possui exercicios', 'OK', { duration: 3000 });
        return;
      }
      alert(result.List[0].equipment.name);
      this.dataSource =  new MatTableDataSource<TrainingExerciseDetails>(result.List);

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
      commandExercise.id = this.random.NewId();
      const exerciseComannd = new CreateTrainingExerciseCommand(
        commandExercise.id,
        commandExercise.name,
        commandExercise.description,
        commandExercise.id_training,
        commandExercise.equipment.id,
        commandExercise.repetition,
        commandExercise.charge,
        commandExercise.sessions
      );
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
        this.updateExercise();
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

  private updateExercise(){
    for(let commandExercise of this.exercises.list){
      commandExercise.id_training = this.refId;
      const exerciseComannd = new UpdateTrainingExerciseCommand(
        commandExercise.id,
        commandExercise.name,
        commandExercise.description,
        commandExercise.id_training,
        commandExercise.equipment.id,
        commandExercise.repetition,
        commandExercise.charge,
        commandExercise.sessions
      );
      this.trainingService.updateExercise(exerciseComannd).subscribe();
    }
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

  remove() {
    this.confirmDialogService.confirmRemove('Deseja remover o usuário?').subscribe(confirm => {
      if (!confirm) {
        return;
      }
      this.snackBar.open('Falha ao remover o exercicio!', 'OK', { duration: 3000 });
    //   const command = new RemoveTrainingCommand(id);
    //   console.log("aqui");
    //   this.trainingService.removeTraining(command).subscribe((result) => {
    //       if (result.Rows > 0) {
    //         this.snackBar.open('Agenda removida com sucesso!', 'OK', { duration: 3000 });
    //         this.removeTrainingList(id);
    //         return;
    //       }
    //       this.snackBar.open('Falha ao remover o usuário!', 'OK', { duration: 3000 });
    //     }
    //   );
    // 
    });
  }

  openDialog(exerciseData: any = null): void {
    
    
    const dialogRef = this.dialog.open(ExerciseFormComponent, {
      height: '500px',
      width: '600px',
      data:  exerciseData
    });
    dialogRef.beforeClosed().subscribe(result => {
      if(result.id == null){
        this.exercises.list.push(result);
      }else{
        this.exercises.list[this.exercises.list.indexOf(result)] = result;
      }
      this.dataSource =  new MatTableDataSource<TrainingExerciseDetails>(this.exercises.list);
      console.log('The dialog was closed');

    });

  }



}