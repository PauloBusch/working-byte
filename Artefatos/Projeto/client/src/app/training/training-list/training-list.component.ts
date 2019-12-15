import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { TrainingService } from 'src/app/shared/services/training.service';
import { ListTrainingQuery } from '../models/queries/ListTrainingQuery';
import { Storage } from 'src/app/shared/utils/storage';
import { TrainingList } from '../models/view-models/training.list';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RemoveTrainingCommand } from '../models/commands/removeTrainingCommand';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  private listQuery: ListTrainingQuery;
  private training = new AsyncQuery<TrainingList>();
  options: TrainingList[];
  displayedColumns: string[] = [ 'id', 'name', 'description', 'option'];
  dataSource: MatTableDataSource<TrainingList>;

  constructor(
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService,
    private dataService: DataService<TrainingList>,
    private appComponent: AppComponent,

  ) { 
    this.listQuery = new ListTrainingQuery();
    
  }

  ngOnInit() {
    this.loadTraining();
    this.dataService.source.subscribe(trainings => this.pushTrainingList(trainings));
  }

  public pushTrainingList(trainings: TrainingList) {
    if (!trainings) {
      return;
    }

    const indexCalendar = this.training.list.findIndex(us => us.id === trainings.id);
    if (indexCalendar === -1) {
      this.training.list.unshift(trainings);
    } else {
      this.training.list[indexCalendar] = trainings;
    }
    this.dataSource = new MatTableDataSource<TrainingList>(this.training.list);
  }


  loadTraining(){
    // this.trainingService.getTraining(this.listQuery).subscribe(result => {
    //   //this.options = result.List;
    //   this.dataSource = new MatTableDataSource<TrainingList>(result.List);


    // });

    this.training.$list = this.trainingService.getTraining(this.listQuery);
    this.training.subsc = this.training.$list.subscribe(result => {
    this.dataSource = new MatTableDataSource<TrainingList>(result.List);
    });
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o usuário?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveTrainingCommand(id);
      console.log("aqui");
      this.trainingService.removeTraining(command).subscribe((result) => {
          if (result.Rows > 0) {
            this.snackBar.open('Agenda removida com sucesso!', 'OK', { duration: 3000 });
            this.removeTrainingList(id);
            return;
          }
          this.snackBar.open('Falha ao remover o usuário!', 'OK', { duration: 3000 });
        }
      );
    });
  }

  public removeTrainingList(id: string) {
    this.training.list = this.training.list.filter(us => us.id !== id);
  }
}
