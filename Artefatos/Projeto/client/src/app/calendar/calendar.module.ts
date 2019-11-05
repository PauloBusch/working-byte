import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [CalendarFormComponent],
  imports: [
    CommonModule,
    MatTableModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class CalendarModule { }
