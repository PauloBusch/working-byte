import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatToolbarModule,
  MatListModule, MatSidenavModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './shared/logo/logo.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TrainingComponent } from './training/training.component';
import { MenuComponent } from './shared/menu/menu.component';
import { UserModule } from './user/user/user.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './shared/services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    PageNotFoundComponent,
    TrainingComponent,
    MenuComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UserModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    HttpClientModule,
    UserService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
