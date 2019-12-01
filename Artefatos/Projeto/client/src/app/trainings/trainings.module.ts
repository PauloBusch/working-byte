import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingComponent } from './training-form/training.component';
import { 
  MatBottomSheetModule, 
  MatProgressSpinnerModule, 
  MatCheckboxModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatListModule, 
  MatPaginatorModule, 
  MatSelectModule, 
  MatSidenavModule, 
  MatButtonModule, 
  MatSnackBarModule, 
  MatCardModule, 
  MatInputModule, 
  MatFormFieldModule, 
  MatAutocompleteModule, 
  MatDialogModule 
} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    TrainingComponent,
    TrainingListComponent
  ],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,

    MatCardModule,
    MatInputModule,
    MatFormFieldModule,

    MatAutocompleteModule, 
    MatDialogModule 
  ]
})
export class TrainingsModule { }
