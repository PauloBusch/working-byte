import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatButtonModule, MatInputModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentService } from '../shared/services/payment.service';



@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentsModule { }
