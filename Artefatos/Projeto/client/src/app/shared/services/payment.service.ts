import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandResult } from '../models/CommandRestult.model';
import { CreatePaymentCommand } from 'src/app/payments/models/commands/createPaymentCommand';
import { UpdatePaymentCommand } from 'src/app/payments/models/commands/updatePaymentCommand';
import { Content } from '../utils/content';
import { RemovePaymentCommand } from 'src/app/payments/models/commands/removePaymentCommand';
import { QueryResult } from '../models/QueryResult.model';
import { PaymentDetail } from 'src/app/payments/models/view-models/payment.detail';
import { GetPaymentQuery } from 'src/app/payments/models/queries/getPaymentQuery';
import { PaymentList } from 'src/app/payments/models/view-models/payment.list';
import { ListPaymentQuery } from 'src/app/payments/models/queries/listPaymentQuery';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = `${environment.apiUrl}/payments`;

  constructor(
    private http: HttpClient
  ) { }

  public GetPayments(query: ListPaymentQuery): Observable<QueryResult<PaymentList>> {
    return this.http.get<QueryResult<PaymentList>>(this.url, Content.GetParams(query));
  }

  public GetPaymentById(query: GetPaymentQuery): Observable<QueryResult<PaymentDetail>> {
    return this.http.get<QueryResult<PaymentDetail>>(`${this.url}/${query.id}`, Content.GetParams(query));
  }

  public create(command: CreatePaymentCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(this.url, command);
  }

  public update(command: UpdatePaymentCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(this.url, command);
  }

  public remove(command: RemovePaymentCommand): Observable<CommandResult>{
    return this.http.delete<CommandResult>(`${this.url}/${command.id}`, Content.GetParams(command));
  }
}
