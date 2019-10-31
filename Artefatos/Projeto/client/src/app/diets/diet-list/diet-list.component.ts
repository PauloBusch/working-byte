import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { MatSnackBar } from '@angular/material';
import { Storage } from 'src/app/shared/utils/storage';

import { listDietQuery } from '../models/queries/listDietQuery';
import { DietList } from '../models/view-models/diet.list';
import { dietService } from 'src/app/shared/services/diet.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-diet-list',
  templateUrl: './diet-list.component.html',
  styleUrls: ['./diet-list.component.scss']
})
export class DietListComponent implements OnInit, OnDestroy {
    private listQuery: listDietQuery;
    private diets = new AsyncQuery<DietList>();

  constructor(
    private dietService: dietService,
    private ConfirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<DietList>) {
      const limit = Storage.get('diet.limit', 5);
      const page = Storage.get('diet.page', 5);
      this.listQuery = new listDietQuery(limit, page, false, 'diet_created');

   }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

 }