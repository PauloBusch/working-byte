import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './shared/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,

    FlexLayoutModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
