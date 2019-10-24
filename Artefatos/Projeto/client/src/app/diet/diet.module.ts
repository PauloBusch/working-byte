import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatProgressSpinnerModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DietComponent } from '../diet/diet-forms/diet.component';
import { DietListComponent } from '../diet/diet-list/diet-list.component';
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

        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatSnackBarModule,

        MatCardModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class DietModule { }