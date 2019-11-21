import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Content } from '../utils/content';

import { QueryResult } from '../models/QueryResult.model';
import { CommandResult } from '../models/CommandRestult.model';
import { EquipmentList } from 'src/app/equipments/models/view-models/equipment.list';
import { ListEquipmentQuery } from 'src/app/equipments/models/queries/listEquipmentQuery';
import { GetEquipmentQuery } from 'src/app/equipments/models/queries/getEquipmentQuery';
import { EquipmentDetails } from 'src/app/equipments/models/view-models/equipment.details';
import { CreateEquipmentCommand } from 'src/app/equipments/models/commands/createEquipmentCommand';
import { UpdateEquipmentCommand } from 'src/app/equipments/models/commands/updateEquipmentCommand';
import { RemoveEquipmentCommand } from 'src/app/equipments/models/commands/removeEquipmentCommand';
import { ListTypeQuery } from 'src/app/equipments/models/queries/lsitTypeQuery';
import { TypeList } from 'src/app/equipments/models/view-models/type.list';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  create(command: CreateEquipmentCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/equipments`, command);
  }

  update(command: UpdateEquipmentCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/equipments/${command.id}`, command);
  }

  remove(command: RemoveEquipmentCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/equipments/${command.id}`, Content.GetParams(command));
  }

  getTypes(query: ListTypeQuery): Observable<QueryResult<TypeList>> {
    return this.http.get<QueryResult<TypeList>>(`${this.url}/equipmentsTypes`, Content.GetParams(query));
  }

  getEquipments(query: ListEquipmentQuery): Observable<QueryResult<EquipmentList>> {
    return this.http.get<QueryResult<EquipmentList>>(`${this.url}/equipments`, Content.GetParams(query));
  }

  getEquipmentById(query: GetEquipmentQuery): Observable<QueryResult<EquipmentDetails>> {
    return this.http.get<QueryResult<EquipmentDetails>>(`${this.url}/equipments`, Content.GetParams(query));
  }
}
