import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent } from '@angular/material';
import { EquipamentService } from 'src/app/shared/services/equipament.service';
import { Storage } from 'src/app/shared/utils/storage';
import { ListEquipamentQuery } from '../models/queries/listEquipamentQuery';
import { EquipamentList } from '../models/view-models/equipament.list';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemoveEquipamentCommand } from '../models/commands/removeEquipamentCommand';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-equipament-list',
  templateUrl: './equipament-list.component.html',
  styleUrls: ['./equipament-list.component.scss']
})
export class EquipamentListComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'code', 'type_name', 'is_disponible'];
  dataSource: MatTableDataSource<EquipamentList>;

  private listQuery: ListEquipamentQuery;
  private equipaments = new AsyncQuery<EquipamentList>();

  constructor(
    private equipamentService: EquipamentService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<EquipamentList>
  ) {
    const limit = Storage.get('equipaments.limit', 10);
    const page = Storage.get('equipaments.page', 1);
    const sortAsc = Storage.get('equipaments.sortAsc', false);
    const columnSort = Storage.get('equipaments.columnSort', 'equipament_created');
    this.listQuery = new ListEquipamentQuery(page, limit, sortAsc, columnSort);
  }

  ngOnInit() {
    this.loadEquipaments();
    this.dataService.source.subscribe(equipament => this.pushEquipamentList(equipament));
  }

  ngOnDestroy() {
    this.equipaments.subsc.unsubscribe();
  }

  pushEquipamentList(equipament: EquipamentList) {
    if (!equipament) {
      return;
    }

    const indexEquipament = this.equipaments.list.findIndex(e => e.id === equipament.id);
    if (indexEquipament === -1){
      this.equipaments.list.unshift(equipament);
    } else {
      this.equipaments.list[indexEquipament] = equipament;
    }
  }

  removeEquipamentList(id: string) {
    this.equipaments.list = this.equipaments.list.filter(e => e.id !== id);
  }

  loadEquipaments() {
    this.equipaments.$list = this.equipamentService.getEquipaments(this.listQuery);
    this.equipaments.subsc = this.equipaments.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<EquipamentList>(result.List);
    });
  }

  pageChange(ev: PageEvent) {
    this.listQuery.page = ev.pageIndex + 1;
    this.listQuery.limit = ev.pageSize;
    Storage.set('equipaments.limit', this.listQuery.limit);
    Storage.set('equipaments.page', this.listQuery.page);
    this.loadEquipaments();
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o equipamento?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveEquipamentCommand(id);
      this.equipamentService.remove(command).subscribe(result => {
        if (result.Rows > 0) {
          this.snackBar.open('Equipamento removido com sucesso!', 'OK', { duration: 3000 });
          this.removeEquipamentList(id);
          return;
        }
        this.snackBar.open('Falha ao remover o equipamento!', 'OK');
      });
    });
  }
}
