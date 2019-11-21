import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { MatSnackBar, MatTableDataSource, PageEvent } from '@angular/material';
import { Storage } from 'src/app/shared/utils/storage';

import { ListDietQuery } from '../models/queries/listDietQuery';
import { DietList } from '../models/view-models/diet.list';
import { DietService } from 'src/app/shared/services/diet.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { DataService } from 'src/app/shared/services/data.service';
import { RemoveDietCommand } from '../models/commands/removeDietCommand';

@Component({
  selector: 'app-diet-list',
  templateUrl: './diet-list.component.html',
  styleUrls: ['./diet-list.component.scss']
})
export class DietListComponent implements OnInit, OnDestroy {
    private listQuery: ListDietQuery;
    private diets = new AsyncQuery<DietList>();

    displayedColumns: string[] = ['name', 'description', 'type_diet', 'symbol'];
    dataSource: MatTableDataSource<DietList>;


  constructor(
    private dietService: DietService,
    private ConfirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<DietList>) {
      const limit = Storage.get('diet.limit', 10);
      const page = Storage.get('diet.page', 1);
      const sortAsc = Storage.get('diet.sortAsc', false);
      const columnSort = Storage.get('diet.columnSort', 'diet_created');
      this.listQuery = new ListDietQuery(page, limit, sortAsc, columnSort);
   }

  ngOnInit() {
    this.loadDiets();
    this.dataService.source.subscribe(diets => this.pushDietList(diets));
  }

  ngOnDestroy() {
    this.diets.subsc.unsubscribe();
  }

  pushDietList(diet: DietList){
    if(!diet){
      return;
    }

    const indexDiet = this.diets.list.findIndex(e => e.id === diet.id);
    if(indexDiet === -1){
      this.diets.list.unshift(diet);
    } else {
      this.diets.list[indexDiet] = diet;
    }
    this.dataSource = new MatTableDataSource<DietList>(this.diets.list);
  }

  removeDietList(id: string){
    this.diets.list = this.diets.list.filter(e => e.id !== id);
  }

  loadDiets(){
    this.diets.$list = this.dietService.getDiet(this.listQuery);
    this.diets.subsc = this.diets.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<DietList>(result.List);
    })
  }

  pageChange(ev: PageEvent){
    this.listQuery.page = ev.pageIndex + 1;
    this.listQuery.limit = ev.pageSize;
    Storage.set('documents.limit', this.listQuery.limit);
    Storage.set('documents.page', this.listQuery.page);
    this.loadDiets();
  }

  remove(id: string){
    this.ConfirmDialogService.confirmRemove("Deseja remover a dieta???").subscribe(confirm => {
      if(!confirm){
        return;
      }

      const command = new RemoveDietCommand(id);

      this.dietService.remove(command).subscribe(result => {
        if(result.Rows > 0){
        this.snackBar.open('Dieta removida com sucesso.', 'OK', {duration: 3000 });
        this.removeDietList(id);
        return;
      }
        this.snackBar.open('Falha ao remover Dieta.', 'OK');
      });
    });
  }
 }