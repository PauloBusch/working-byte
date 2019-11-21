import { Component, OnInit } from '@angular/core';
import { PaymentList } from '../models/view-models/payment.list';
import { MatTableDataSource } from '@angular/material/table/typings/table-data-source';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  displayColumns: string[] = ['name', 'value', 'day', 'actions'];
  dataSource: MatTableDataSource<PaymentList>;

  constructor() { }

  ngOnInit() {
  }

}
