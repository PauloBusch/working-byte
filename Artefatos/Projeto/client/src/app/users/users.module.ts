import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatCheckboxModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IConfig } from 'ngx-mask/lib/config';

import { UserComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Patterns } from '../shared/utils/validators';
import { UserService } from '../shared/services/user.service';
import { Random } from '../shared/utils/random';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
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
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    Patterns,
    UserService,
    Random
  ]
})
export class UsersModule { }
