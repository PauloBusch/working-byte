import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Training } from '../models/training.model';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  private isNew: boolean;

  private training: Training;
  private form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {
    this.training = new Training();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [ '' ],
      id_type: [ 0 ],
      rep: [ 0 ],
      weight: [ 0 ],
      id_equip: [ 0 ]
    });
  }

  loadData(params: { id: string }) {
    console.log(params);
  }

  save() {
    this.training = Object.assign(new Training(), this.form.value);
	  window.alert("Treino Cadastrado!");
    debugger;
  }

  close() {
    this.bottomSheet.dismiss();
  }
}
