import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../training-form/training-form.component';
import { TrainingListComponent } from '../training-list/training-list.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {coerceNumberProperty} from '@angular/cdk/coercion';


@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  private form: FormGroup;
  valueRep = 0;
  charge = 0;
  session = 0;

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }

    return value;
  }


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        equipment: ['', Validators.required]

      });
  }

  close(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }

  ngOnInit() {
  }

}
