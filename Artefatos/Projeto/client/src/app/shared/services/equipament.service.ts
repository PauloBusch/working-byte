import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QueryResult } from '../models/QueryResult.model';
import { Observable } from 'rxjs';
import { Content } from '../utils/content';

import { EquipamentList } from 'src/app/equipaments/models/view-models/equipament.list';
import { ListEquipamentQuery } from 'src/app/equipaments/models/queries/listEquipamentQuery';
import { GetEquipamentQuery } from 'src/app/equipaments/models/queries/getEquipamanetQuery';
import { EquipamentDetails } from 'src/app/equipaments/models/view-models/equipament.details';

@Injectable({
  providedIn: 'root'
})
export class EquipamentService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getEquipaments(query: ListEquipamentQuery): Observable<QueryResult<EquipamentList>> {
    return this.http.get<QueryResult<EquipamentList>>(`${this.url}/equipaments`, Content.GetParams(query));
  }

  getEquipamentById(query: GetEquipamentQuery): Observable<QueryResult<EquipamentDetails>> {
    return this.http.get<QueryResult<EquipamentDetails>>(`${this.url}/equipaments`, Content.GetParams(query));
  }
}
