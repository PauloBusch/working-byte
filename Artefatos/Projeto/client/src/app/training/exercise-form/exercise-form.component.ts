import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../training-form/training-form.component';
import { TrainingListComponent } from '../training-list/training-list.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { TrainingExerciseDetails } from '../models/view-models/trainingExercise.details';
import { tick } from '@angular/core/testing';


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

  exercise: TrainingExerciseDetails = new TrainingExerciseDetails(null, "", "", "", "", 0, 0, 0 );

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }

    return value;
  }



  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: TrainingExerciseDetails
    ) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        equipment: ['', Validators.required]

      });

      this.loadData();
    }

    loadData() {
      
      if(!this.data){
        // this.isNew = true;
        
        return;
      }
      this.exercise = this.data;
      alert("vlr =" + this.exercise.description);

    }

  close(): void {
    this.exercise = null;
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }

  ngOnInit() {
  }

}
