import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, 
  MatFormFieldModule, MatInputModule, MatBottomSheetModule, MatProgressSpinnerModule, 
  MatCheckboxModule, MatMenuModule, MatToolbarModule, MatListModule,  MatSelectModule, 
  MatSidenavModule, MatSnackBarModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';

import { CalendarTrainingComponent } from './calendar-training/calendar-training.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';

@NgModule({
  declarations: [CalendarFormComponent, CalendarListComponent, CalendarTrainingComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
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
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  entryComponents: [CalendarTrainingComponent]
})
export class CalendarModule { }
