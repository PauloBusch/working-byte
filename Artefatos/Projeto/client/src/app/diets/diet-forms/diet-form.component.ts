import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar} from '@angular/material';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { GetDietQuery } from '../models/queries/getDietQuery';

import { DietService } from 'src/app/shared/services/diet.service';
import { DietList } from '../models/view-models/diet.list';
import { DataService } from 'src/app/shared/services/data.service';
import { Random } from 'src/app/shared/utils/random';
import { CreateDietCommand } from '../models/commands/createDietCommand';
import { UpdateDietCommand } from '../models/commands/updateDietCommand';
import { DietTypeList } from '../models/view-models/diet.type.list';
import { ListDietTypeQuery } from '../models/queries/listTypeQuery';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import * as _ from 'lodash';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.scss']
})

export class DietComponent implements OnInit {
  public isNew: boolean;
  public refId: string;

  public form: FormGroup;
  public types: DietTypeList[] = [];
  public filteredTypes: Observable<DietTypeList[]>;

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
      description: ['', Validators.required],
      type: this.fb.group({ id: this.random.NewId(), name: ''})
    });
  }

  ngOnInit(){

  }

  loadData(params: { id:string }) {
    this.refId = params.id;
    this.loadTypes();
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

  loadTypes() {
    const queryTypes = new ListDietTypeQuery();
    this.dietService.getDietTypes(queryTypes).subscribe(result => {
      this.types = result.List;
      this.filterTypes();
    });
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
      values.description,
      values.type
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
      values.description,
      values.type
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
      values.description,
      {id: values.type.id, name: values.type.name }
    );
    this.dataService.update(diet);
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
      startWith<string | DietTypeList>(''),
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