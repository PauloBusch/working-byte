import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,

    MatButtonModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [
    UserComponent
  ]
})
export class UsersModule { }
