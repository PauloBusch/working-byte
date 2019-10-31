import { Component, OnInit } from '@angular/core';
import { ListEquipamentQuery } from '../models/queries/listEquipamentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { EquipamentList } from '../models/view-models/equipament.list';

@Component({
  selector: 'app-equipament-form',
  templateUrl: './equipament-form.component.html',
  styleUrls: ['./equipament-form.component.scss']
})
export class EquipamentFormComponent implements OnInit {

  private listQuery: ListEquipamentQuery;
  private equipaments: AsyncQuery<EquipamentList>;

  constructor(
    
  ) { }

  ngOnInit() {
  }

}
