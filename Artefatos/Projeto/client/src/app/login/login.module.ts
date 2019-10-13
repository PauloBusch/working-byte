import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatInputModule
} from '@angular/material';

import { LoginComponent } from './login-form/login.component';
import { LogoModule } from '../shared/components/logo/logo.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LogoModule,

    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,

    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
