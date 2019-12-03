import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingFormComponent } from './training-form/training-form.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, 
  MatFormFieldModule, MatInputModule, MatBottomSheetModule, MatProgressSpinnerModule, 
  MatCheckboxModule, MatMenuModule, MatToolbarModule, MatListModule,  MatSelectModule, 
  MatSidenavModule, MatSnackBarModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [TrainingFormComponent, TrainingListComponent],
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
  ]
})
export class TrainingModule { }
