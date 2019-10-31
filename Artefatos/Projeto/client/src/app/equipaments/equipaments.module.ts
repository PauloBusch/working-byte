import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatIconModule } from '@angular/material';
import { EquipamentFormComponent } from './equipament-form/equipament-form.component';
import { EquipamentListComponent } from './equipament-list/equipament-list.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [EquipamentFormComponent, EquipamentListComponent],
  imports: [
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    MatTableModule
  ]
})
export class EquipamentsModule { }
