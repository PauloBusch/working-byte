import { Component, OnInit } from '@angular/core';
import { ListEquipmentQuery } from '../models/queries/listEquipmentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { EquipmentList } from '../models/view-models/equipment.list';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
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

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;
  private types: TypeList[];

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
      code: ['', Validators.required]
    });
  }

  ngOnInit() {  }

  loadData(params: { id: string }) {
    this.refId = params.id;
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

    const queryTypes = new ListTypeQuery();
    this.equipmentService.getTypes(queryTypes).subscribe(result => {
      this.types = result.List;
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
      values.code
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
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  update(values: any){
    const command = new UpdateEquipmentCommand(
      this.refId,
      values.name,
      values.code
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
}
