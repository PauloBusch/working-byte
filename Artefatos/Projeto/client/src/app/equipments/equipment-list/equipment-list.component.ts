import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSnackBar, PageEvent } from '@angular/material';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Storage } from 'src/app/shared/utils/storage';
import { ListEquipmentQuery } from '../models/queries/listEquipmentQuery';
import { EquipmentList } from '../models/view-models/equipment.list';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemoveEquipmentCommand } from '../models/commands/removeEquipmentCommand';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'code', 'type_name', 'is_disponible', 'actions'];
  dataSource: MatTableDataSource<EquipmentList>;

  public listQuery: ListEquipmentQuery;
  public equipments = new AsyncQuery<EquipmentList>();

  constructor(
    private equipmentService: EquipmentService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<EquipmentList>
  ) {
    const limit = Storage.get('equipments.limit', 10);
    const page = Storage.get('equipments.page', 1);
    const sortAsc = Storage.get('equipments.sortAsc', false);
    const columnSort = Storage.get('equipments.columnSort', 'equipment_created');
    this.listQuery = new ListEquipmentQuery(page, limit, sortAsc, columnSort);
  }

  ngOnInit() {
    this.loadEquipments();
    this.dataService.source.subscribe(equipment => this.pushEquipmentList(equipment));
  }

  ngOnDestroy() {
    this.equipments.subsc.unsubscribe();
  }

  pushEquipmentList(equipment: EquipmentList) {
    if (!equipment) {
      return;
    }

    const indexEquipment = this.equipments.list.findIndex(e => e.id === equipment.id);
    if (indexEquipment === -1) {
      this.equipments.list.unshift(equipment);
    } else {
      this.equipments.list[indexEquipment] = equipment;
    }
    this.dataSource = new MatTableDataSource<EquipmentList>(this.equipments.list);
  }

  removeEquipmentList(id: string) {
    this.equipments.list = this.equipments.list.filter(e => e.id !== id);
    this.dataSource = new MatTableDataSource<EquipmentList>(this.equipments.list);
  }

  loadEquipments() {
    this.equipments.$list = this.equipmentService.getEquipments(this.listQuery);
    this.equipments.subsc = this.equipments.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<EquipmentList>(result.List);
    });
  }

  pageChange(ev: PageEvent) {
    this.listQuery.page = ev.pageIndex + 1;
    this.listQuery.limit = ev.pageSize;
    Storage.set('equipments.limit', this.listQuery.limit);
    Storage.set('equipments.page', this.listQuery.page);
    this.loadEquipments();
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o equipmento?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveEquipmentCommand(id);
      this.equipmentService.remove(command).subscribe(result => {
        if (result.Rows > 0) {
          this.snackBar.open('Equipmento removido com sucesso!', 'OK', { duration: 3000 });
          this.removeEquipmentList(id);
          return;
        }
        this.snackBar.open('Falha ao remover o equipmento!', 'OK', { duration: 3000 });
      });
    });
  }
}
