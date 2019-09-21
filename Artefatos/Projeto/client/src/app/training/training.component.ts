import { Component, OnInit } from '@angular/core';

import { trainings } from '../trainings';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainings = trainings;
  constructor() { }

  ngOnInit() {
  }

}
