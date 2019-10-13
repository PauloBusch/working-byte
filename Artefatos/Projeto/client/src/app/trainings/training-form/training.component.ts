import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Training } from '../models/training.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  private training: Training;
  private form: FormGroup;


  constructor(private fb: FormBuilder) { 
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

  submit(){
    this.training = Object.assign(new Training(), this.form.value);
	window.alert("Treino Cadastrado!");
    debugger;
  }
  
  cancel(){
	window.alert("Cadastro Cancelado!");
	//desenvolver algo que limpe os campos.
  }

}
