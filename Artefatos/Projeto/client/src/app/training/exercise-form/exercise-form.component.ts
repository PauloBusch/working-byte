import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TrainingListComponent } from '../training-list/training-list.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { TrainingExerciseDetails } from '../models/view-models/trainingExercise.details';
import { tick } from '@angular/core/testing';
import { startWith, map } from 'rxjs/operators';
import { EquipmentList } from 'src/app/equipments/models/view-models/equipment.list';
import { Observable } from 'rxjs';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { ListEquipmentQuery } from 'src/app/equipments/models/queries/listEquipmentQuery';
import { Storage } from 'src/app/shared/utils/storage';


@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  private form: FormGroup;
  private isNew: boolean;
  options: EquipmentList[];
  filteredOptions: Observable<EquipmentList[]>;

  public exercise = new TrainingExerciseDetails(null, "", "", "", "", 0, 0, 0 );
  listQuery: ListEquipmentQuery;
   formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }
    return value;
  }


  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<any>,
      private equipService: EquipmentService,
      private snackBar: MatSnackBar,
      
      @Inject(MAT_DIALOG_DATA) public data: TrainingExerciseDetails
    ) {
      
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        equipment: ['', Validators.required]

      });
      const limit = Storage.get('equipments.limit', 10);
      const page = Storage.get('equipments.page', 1);
      const sortAsc = Storage.get('equipments.sortAsc', false);
      const columnSort = Storage.get('equipments.columnSort', 'equipment_created');
      this.listQuery = new ListEquipmentQuery(page, limit, sortAsc, columnSort);
      this.loadData();
    }


  loadData() {
    if(!this.data){
      this.isNew = true;
      return;
    } 
    this.exercise = this.data;
  }

  loadEquip(){
      this.equipService.getEquipments(this.listQuery).subscribe(result => {
      this.options = result.List;
      this.filterEquip();
      this.form.controls.equipment.setValue(this.exercise.equipment.name);
    });
  }

  close(): void {
    this.exercise = null;
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.snackBar.open('Preencha os campos obrigatórios', 'OK', { duration: 3000 });
      return;
    }
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }

  ngOnInit() {
    this.loadEquip();
  }

  private _filter(name: string): EquipmentList[] {
    const filterValue = name.toString().toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  filterEquip(){
    this.filteredOptions = this.form.controls.equipment.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  
}
