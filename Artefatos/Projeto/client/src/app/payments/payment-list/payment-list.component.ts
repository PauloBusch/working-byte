import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentList } from '../models/view-models/payment.list';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ListPaymentQuery } from '../models/queries/listPaymentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'value', 'day', 'actions'];
  dataSource: MatTableDataSource<PaymentList>;

  private listQuery: ListPaymentQuery;
  private payments: AsyncQuery<PaymentList>;

  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private dataService: DataService<PaymentList>
  ) {
    this.listQuery = new ListPaymentQuery();
    this.payments = new AsyncQuery<PaymentList>();
  }

  ngOnInit() {
    this.dataService.source.subscribe(payment => this.pushPaymentList(payment));
  }

  ngOnDestroy() {
    this.payments.subsc.unsubscribe();
  }

  pushPaymentList(payment: PaymentList) {

  }

  loadPayments() {
    this.payments.$list = this.paymentService.GetPayments(this.listQuery);
    this.payments.subsc = this.payments.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<PaymentList>(result.List);
    });
  }
}
