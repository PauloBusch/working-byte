import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetPaymentQuery } from '../models/queries/getPaymentQuery';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { CreatePaymentCommand } from '../models/commands/createPaymentCommand';
import { Random } from 'src/app/shared/utils/random';
import { DataService } from 'src/app/shared/services/data.service';
import { PaymentList } from '../models/view-models/payment.list';
import { UpdatePaymentCommand } from '../models/commands/updatePaymentCommand';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  private isNew: boolean;
  private refId: string;
  private form: FormGroup;

  constructor(
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private random: Random,
    private dataService: DataService<PaymentList>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
      day: [null, [Validators.required, Validators.min(0), Validators.max(32)]]
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.form.invalid){
      this.snackBar.open('Existem campos inválidos');
      return;
    }

    const values = this.form.value;
    if (this.isNew) {
      this.create(values);
    } else {
      this.update(values);
    }
  }

  create(values: any) {
    this.refId = this.random.NewId();
    const command = new CreatePaymentCommand(
      this.refId,
      values.name,
      values.value,
      values.day
    );

    this.paymentService.create(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Pagamento salvo com sucesso', 'OK', { duration: 3000 });
        this.updatePaymentList(values);
        this.close();
        return;
      }

      this.snackBar.open('Falha ao gravar pagamento!', 'OK', { duration: 3000 });
    });
  }

  update(values: any) {
    const command = new UpdatePaymentCommand(
      this.refId,
      values.name,
      values.value,
      values.day
    );

    this.paymentService.update(command).subscribe(result => {
      if (result.ErrorCode === EErrorCode.None) {
        this.snackBar.open('Pagamento salvo com sucesso', 'OK', { duration: 3000 });
        this.updatePaymentList(values);
        this.close();
        return;
      }

      this.snackBar.open('Falha ao gravar pagamento!', 'OK', { duration: 3000 });
    });
  }

  loadData(params: { id: string }) {
    this.refId = params.id;
    if (!this.refId) {
      this.isNew = true;
      return;
    }

    const query = new GetPaymentQuery(this.refId);
    this.paymentService.GetPaymentById(query).subscribe(result => {
      if (result.ErrorCode !== EErrorCode.None){
        this.snackBar.open('Falha ao carregar pagamento', 'OK', { duration: 3000 });
        return;
      }

      const payment = result.List[0];
      this.form.patchValue(payment);
    });
  }

  close() {
    this.bottomSheet.dismiss();
  }

  updatePaymentList(values: any) {
    const payment = new PaymentList(
      this.refId,
      values.name,
      values.value,
      values.day
    );
    this.dataService.update(payment);
  }
}
