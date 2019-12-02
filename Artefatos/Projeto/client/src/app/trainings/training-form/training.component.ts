import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Training } from '../models/training.model';
import { MatBottomSheet } from '@angular/material';
import { EquipmentList } from 'src/app/equipments/models/view-models/equipment.list';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  public  isNew: boolean;

  public training: Training;
  public form: FormGroup;
  public id_type: number = 10;
  public id_equipment: number = 20;
  public equipment = { id: 10, name: 'teste' };


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
  }

  close() {
    this.bottomSheet.dismiss();
  }
}
