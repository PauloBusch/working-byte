import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Content } from '../utils/content';

import { QueryResult } from '../models/QueryResult.model';
import { CommandResult } from '../models/CommandRestult.model';
import { EquipamentList } from 'src/app/equipaments/models/view-models/equipament.list';
import { ListEquipamentQuery } from 'src/app/equipaments/models/queries/listEquipamentQuery';
import { GetEquipamentQuery } from 'src/app/equipaments/models/queries/getEquipamanetQuery';
import { EquipamentDetails } from 'src/app/equipaments/models/view-models/equipament.details';
import { CreateEquipamentCommand } from 'src/app/equipaments/models/commands/createEquipamentCommand';
import { UpdateEquipamentCommand } from 'src/app/equipaments/models/commands/updateEquipamentCommand';
import { RemoveEquipamentCommand } from 'src/app/equipaments/models/commands/removeEquipamentCommand';

@Injectable({
  providedIn: 'root'
})
export class EquipamentService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  create(command: CreateEquipamentCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/equipaments`, command);
  }

  update(command: UpdateEquipamentCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/equipaments/${command.id}`, command);
  }

  remove(command: RemoveEquipamentCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/equipaments/${command.id}`, Content.GetParams(command));
  }

  getEquipaments(query: ListEquipamentQuery): Observable<QueryResult<EquipamentList>> {
    return this.http.get<QueryResult<EquipamentList>>(`${this.url}/equipaments`, Content.GetParams(query));
  }

  getEquipamentById(query: GetEquipamentQuery): Observable<QueryResult<EquipamentDetails>> {
    return this.http.get<QueryResult<EquipamentDetails>>(`${this.url}/equipaments`, Content.GetParams(query));
  }
}
