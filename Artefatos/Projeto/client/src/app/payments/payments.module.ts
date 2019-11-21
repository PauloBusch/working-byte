import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';



@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentsModule { }
