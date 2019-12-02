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

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  private listQuery: ListTrainingQuery;
  private training = new AsyncQuery<TrainingList>();
  options: TrainingList[];

  constructor(
    private trainingService: TrainingService

  ) { 
    this.listQuery = new ListTrainingQuery();

  }

  ngOnInit() {
    this.loadTraining();

  }

  loadTraining(){
    this.trainingService.getTraining(this.listQuery).subscribe(result => {
      this.options = result.List;

    });
  }
}
