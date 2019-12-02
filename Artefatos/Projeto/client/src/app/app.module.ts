import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatToolbarModule,
  MatListModule, MatSidenavModule, MatDialogModule, MatDialogRef, MatPaginatorIntl, MatTableModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TrainingComponent } from './trainings/training-form/training.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { LogoModule } from './shared/components/logo/logo.module';
import { HttpInterceptorProviders } from './shared/interceptors/provider-interceptor';
import { AuthGuard } from './shared/guards/auth.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './shared/components/confirm-dialog/confirm-dialog.service';
import { CustomPaginator } from './shared/utils/paginator';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { TrainingsModule } from './trainings/trainings.module';
import { TrainingModule } from './training/training.module';
import { DietModule } from './diets/diets.module';
import { EquipmentFormComponent } from './equipments/equipment-form/equipment-form.component';
import { EquipmentListComponent } from './equipments/equipment-list/equipment-list.component';
import { EquipmentsModule } from './equipments/equipments.module';
import { CalendarModule } from './calendar/calendar.module';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentsModule } from './payments/payments.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MenuComponent,
    ConfirmDialogComponent,
    BottomSheetComponent
  ],
  imports: [
    LoginModule,
    UsersModule,
    TrainingsModule,
    EquipmentsModule,
    LogoModule,
    DietModule,
    CalendarModule,
    PaymentsModule,
    TrainingModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    

    MatCardModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    ConfirmDialogService,
    HttpClientModule,
    AppComponent,
    HttpInterceptorProviders,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
