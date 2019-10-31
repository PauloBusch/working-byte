import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EquipamentService } from 'src/app/shared/services/equipament.service';
import { Storage } from 'src/app/shared/utils/storage';
import { ListEquipamentQuery } from '../models/queries/listEquipamentQuery';
import { EquipamentList } from '../models/view-models/equipament.list';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';

@Component({
  selector: 'app-equipament-list',
  templateUrl: './equipament-list.component.html',
  styleUrls: ['./equipament-list.component.scss']
})
export class EquipamentListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<EquipamentList>;

  private listQuery: ListEquipamentQuery;
  private equipaments = new AsyncQuery<EquipamentList>();

  constructor(
    private equipamentService: EquipamentService
  ) {
    const limit = Storage.get('equipaments.limit', 10);
    const page = Storage.get('equipaments.page', 1);
    const sortAsc = Storage.get('equipaments.sortAsc', false);
    const columnSort = Storage.get('equipaments.columnSort', 'equipament_created');
    this.listQuery = new ListEquipamentQuery(page, limit, sortAsc, columnSort);
  }

  ngOnInit() {
    this.loadEquipaments();
  }

  ngOnDestroy(){
    this.equipaments.subsc.unsubscribe();
  }

  loadEquipaments() {
    this.equipaments.$list = this.equipamentService.getEquipaments(this.listQuery);
    this.equipaments.subsc = this.equipaments.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<EquipamentList>(result.List);
    });
  }
}
