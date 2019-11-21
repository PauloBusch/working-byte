import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatMenuModule } from '@angular/material';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from '../shared/services/data.service';



@NgModule({
  declarations: [EquipmentFormComponent, EquipmentListComponent],
  imports: [
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule
  ],
  providers: [
    DataService
  ]
})
export class EquipmentsModule { }
