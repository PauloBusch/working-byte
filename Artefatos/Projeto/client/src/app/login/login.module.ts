import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
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
