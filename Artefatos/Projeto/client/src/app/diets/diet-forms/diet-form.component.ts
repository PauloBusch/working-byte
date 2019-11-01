import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';

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
    private bottomSheet: MatBottomSheet,
  ) { 
    this.form = fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      id_training: ['', Validators.required],
      id_user: ['', Validators.required],
      id_diet_type: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  close() {
    this.bottomSheet.dismiss();
  }

}