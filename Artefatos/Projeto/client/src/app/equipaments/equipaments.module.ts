import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { EquipamentFormComponent } from './equipament-form/equipament-form.component';
import { EquipamentListComponent } from './equipament-list/equipament-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from '../shared/services/data.service';



@NgModule({
  declarations: [EquipamentFormComponent, EquipamentListComponent],
  imports: [
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule
  ],
  providers: [
    DataService
  ]
})
export class EquipamentsModule { }
