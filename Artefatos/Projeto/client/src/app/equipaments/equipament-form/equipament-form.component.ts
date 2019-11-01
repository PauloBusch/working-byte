import { Component, OnInit } from '@angular/core';
import { ListEquipamentQuery } from '../models/queries/listEquipamentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { EquipamentList } from '../models/view-models/equipament.list';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEquipamentCommand } from '../models/commands/createEquipamentCommand';
import { Random } from 'src/app/shared/utils/random';
import { EquipamentService } from 'src/app/shared/services/equipament.service';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { DataService } from 'src/app/shared/services/data.service';
import { UpdateEquipamentCommand } from '../models/commands/updateEquipamentCommand';
import { GetEquipamentQuery } from '../models/queries/getEquipamanetQuery';

@Component({
  selector: 'app-equipament-form',
  templateUrl: './equipament-form.component.html',
  styleUrls: ['./equipament-form.component.scss']
})
export class EquipamentFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private random: Random,
    private bottomSheet: MatBottomSheet,
    private equipamentService: EquipamentService,
    private dataService: DataService<EquipamentList>
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

    const query = new GetEquipamentQuery(this.refId);
    this.equipamentService.getEquipamentById(query).subscribe(result => {
      if (result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Equipamento inexistente!', 'OK', { duration: 3000 });
        return;
      }

      const equipament = result.List[0];
      this.form.patchValue(equipament);
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
    const command = new CreateEquipamentCommand(
      this.refId,
      values.name,
      values.code
    );

    this.equipamentService.create(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Equipamento salvo com sucesso', 'OK', { duration: 3000 });
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
    const command = new UpdateEquipamentCommand(
      this.refId,
      values.name,
      values.code
    );

    this.equipamentService.update(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Equipament salvo com sucesso!', 'OK', { duration: 3000 });
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
    const equipament = new EquipamentList(
      this.refId,
      values.name,
      values.code,
      true
    );

    this.dataService.update(equipament);
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}
