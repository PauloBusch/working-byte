import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, 
  MatFormFieldModule, MatInputModule, MatBottomSheetModule, MatProgressSpinnerModule, 
  MatCheckboxModule, MatMenuModule, MatToolbarModule, MatListModule,  MatSelectModule, 
  MatSidenavModule, MatSnackBarModule, MatCardModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarListComponent } from './calendar-list/calendar-list.component';


import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [CalendarFormComponent, CalendarListComponent],
  imports: [
    CommonModule,

    AppRoutingModule,

    MatTableModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatBottomSheetModule, 
    MatProgressSpinnerModule, 
    MatCheckboxModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatListModule,  
    MatSelectModule, 
    MatSidenavModule, 
    MatSnackBarModule, 
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CalendarModule { }
