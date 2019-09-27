import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatLabelModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './shared/logo/logo.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TrainingComponent } from './training/training.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    PageNotFoundComponent,
    TrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatLabelModule,

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
