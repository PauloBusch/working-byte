import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatProgressSpinnerModule, 
    MatCheckboxModule, MatMenuModule, MatToolbarModule, 
    MatIconModule, MatListModule, MatPaginatorModule, 
    MatSelectModule, MatSidenavModule, MatButtonModule,
     MatSnackBarModule, MatCardModule, MatInputModule,
     MatAutocompleteModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

import { DietComponent } from './diet-forms/diet-form.component';
import { DietListComponent } from '../diets/diet-list/diet-list.component';
import { DietService } from '../shared/services/diet.service';
import { DataService } from '../shared/services/data.service';


@NgModule({
    declarations: [
        DietComponent,
        DietListComponent
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
        MatTableModule,
        MatAutocompleteModule,

        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatSnackBarModule,

        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule
    ],
    providers: [
        DietService,
        DataService
    ]
})
export class DietModule { }
