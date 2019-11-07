import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { GetDietQuery } from '../models/queries/GetDietQuery';

import { DietService } from 'src/app/shared/services/diet.service';
import { DietList } from '../models/view-models/diet.list';
import { DataService } from 'src/app/shared/services/data.service';
import { Random } from 'src/app/shared/utils/random';
import { CreateDietCommand } from '../models/commands/createDietCommand';
import { UpdateDietCommand } from '../models/commands/updateDietCommand';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.scss']
})

export class DietComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private random: Random,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private dietService: DietService,
    private dataService: DataService<DietList>
  ) { 
    this.form = this.fb.group({
      diet_name: ['', Validators.required],
      description: ['', Validators.required]
      
    })
  }

  ngOnInit(){

  }

  loadData(params: { id:string }) {
    this.refId = params.id;
    if(!this.refId){
      this.isNew = true;
      return;
    }

    const query = new GetDietQuery(this.refId);
    this.dietService.getDietById(query).subscribe(result => {
      if(result.ErrorCode === EErrorCode.NotFound || result.Rows === 0){
        this.snackBar.open('Dieta não encontrada', 'OK', { duration: 3000 });
        return;
      }

      const diet = result.List[0];
      this.form.patchValue(diet);
    })
  }

  close() {
    this.bottomSheet.dismiss();
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
    const command = new CreateDietCommand(
      this.refId,
      values.diet_name,
      values.description
    );

    this.dietService.create(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Dieta salva com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }

      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private update(values: any) {
    const command = new UpdateDietCommand(
      this.refId,
      values.diet_name,
      values.description
    );
    this.dietService.update(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Dieta editada com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }
     
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private updateList(values: any) {
    const diet = new DietList(
      this.refId,
      values.diet_name,
      values.description
    );
    this.dataService.update(diet);
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}