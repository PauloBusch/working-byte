import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentList } from '../models/view-models/payment.list';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ListPaymentQuery } from '../models/queries/listPaymentQuery';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemovePaymentCommand } from '../models/commands/removePaymentCommand';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';

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
    private confirmDialogService: ConfirmDialogService,
    private dataService: DataService<PaymentList>
  ) {
    this.listQuery = new ListPaymentQuery();
    this.payments = new AsyncQuery<PaymentList>();
  }

  ngOnInit() {
    this.dataService.source.subscribe(payment => this.pushPaymentList(payment));
    this.loadPayments();
  }

  ngOnDestroy() {
    this.payments.subsc.unsubscribe();
  }

  pushPaymentList(payment: PaymentList) {
    if (!payment) {
      return;
    }

    const indexPayment = this.payments.list.findIndex(f => f.id === payment.id);
    if (indexPayment === -1) {
      this.payments.list.unshift(payment);
    } else {
      this.payments.list[indexPayment] = payment;
    }

    this.dataSource = new MatTableDataSource<PaymentList>(this.payments.list);
  }

  removePaymentList(id: string) {
    this.payments.list = this.payments.list.filter(f => f.id !== id);
    this.dataSource = new MatTableDataSource<PaymentList>(this.payments.list);
  }

  loadPayments() {
    this.payments.$list = this.paymentService.GetPayments(this.listQuery);
    this.payments.subsc = this.payments.$list.subscribe(result => {
      this.dataSource = new MatTableDataSource<PaymentList>(result.List);
    });
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja realmente remover o Pagamento?').subscribe(confirmRemove => {
      if (!confirmRemove){
        return;
      }

      const command = new RemovePaymentCommand(id);
      this.paymentService.remove(command).subscribe(result => {
        if (result.ErrorCode === EErrorCode.None) {
          this.snackBar.open('Pagamento removido com sucesso!', 'OK', { duration: 3000 });
          this.removePaymentList(id);
          return;
        }

        this.snackBar.open('Falha ao remover pagamento', 'OK', { duration: 3000 });
      });
    });
  }
}
