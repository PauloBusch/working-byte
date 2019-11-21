import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ListEquipmentQuery } from '../models/queries/listEquipmentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { EquipmentList } from '../models/view-models/equipment.list';
import { MatBottomSheet, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEquipmentCommand } from '../models/commands/createEquipmentCommand';
import { Random } from 'src/app/shared/utils/random';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { DataService } from 'src/app/shared/services/data.service';
import { UpdateEquipmentCommand } from '../models/commands/updateEquipmentCommand';
import { GetEquipmentQuery } from '../models/queries/getEquipmentQuery';
import { ListTypeQuery } from '../models/queries/lsitTypeQuery';
import { TypeList } from '../models/view-models/type.list';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import * as _ from 'lodash';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;
  private types: TypeList[] = [];
  private filteredTypes: Observable<TypeList[]>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private random: Random,
    private bottomSheet: MatBottomSheet,
    private equipmentService: EquipmentService,
    private dataService: DataService<EquipmentList>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      type: this.fb.group({ id: this.random.NewId(), name: '' })
    });
  }

  ngOnInit() { }

  loadData(params: { id: string }) {
    this.refId = params.id;
    this.loadTypes();
    if (!this.refId) {
      this.isNew = true;
      return;
    }

    const queryEquipments = new GetEquipmentQuery(this.refId);
    this.equipmentService.getEquipmentById(queryEquipments).subscribe(result => {
      if (result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Equipmento inexistente!', 'OK', { duration: 3000 });
        return;
      }

      const equipment = result.List[0];
      this.form.patchValue(equipment);
    });
  }

  loadTypes() {
    const queryTypes = new ListTypeQuery();
    this.equipmentService.getTypes(queryTypes).subscribe(result => {
      this.types = result.List;
      this.filterTypes();
    });
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
    const command = new CreateEquipmentCommand(
      this.refId,
      values.name,
      values.code,
      values.type
    );

    this.equipmentService.create(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Equipmento salvo com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode === EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos!', 'OK', { duration: 3000 });
        return;
      }
      const existsCode = 'Equipment with code aready exists';
      if (result.ErrorCode === EErrorCode.DuplicateUnique && result.Message.search(existsCode) !== -1) {
        this.snackBar.open('Já existe um equipamento com este código!', 'OK', { duration: 3000 });
        return;
      }
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  update(values: any){
    const command = new UpdateEquipmentCommand(
      this.refId,
      values.name,
      values.code,
      values.type
    );

    this.equipmentService.update(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Equipment salvo com sucesso!', 'OK', { duration: 3000 });
        return;
      }
      if (result.ErrorCode === EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos!', 'OK', { duration: 3000 });
        return;
      }
      const existsCode = 'Equipment with code aready exists';
      if (result.ErrorCode === EErrorCode.DuplicateUnique && result.Message.search(existsCode) !== -1) {
        this.snackBar.open('Já existe um equipamento com este código!', 'OK', { duration: 3000 });
        return;
      }
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  close() {
    this.bottomSheet.dismiss();
  }

  updateList(values: any) {
    const equipment = new EquipmentList(
      this.refId,
      values.name,
      values.code,
      true,
      { name: values.type.name }
    );

    this.dataService.update(equipment);
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }

  displayType(value?: any): string | undefined {
    if (!value) {
      return undefined;
    }
    return typeof value === 'object' ? value.name : value;
  }

  filterTypes() {
    this.filteredTypes = this.form.controls.type.valueChanges
    .pipe(
      startWith<string | TypeList>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => {
        if (typeof name !== 'string') {
          return;
        }

        if (!name) {
          return this.types.slice();
        }

        const filterValue = _.deburr(name).toLowerCase();
        return this.types.filter(type => _.deburr(type.name).toLowerCase().indexOf(filterValue) !== -1);
      })
    );
  }
}
