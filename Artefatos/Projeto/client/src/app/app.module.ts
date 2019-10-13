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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TrainingComponent } from './trainings/training-form/training.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { LogoModule } from './shared/components/logo/logo.module';
import { HttpInterceptorProviders } from './shared/interceptors/provider-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TrainingComponent,
    MenuComponent
  ],
  imports: [
    LoginModule,
    UsersModule,
    LogoModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

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
    HttpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
