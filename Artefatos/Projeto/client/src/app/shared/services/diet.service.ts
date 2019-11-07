import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommandResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';

import { CreateDietCommand } from 'src/app/diets/models/commands/createDietCommand';
import { UpdateDietCommand } from 'src/app/diets/models/commands/updateDietCommand';
import { RemoveDietCommand } from 'src/app/diets/models/commands/removeDietCommand';
import { listDietQuery } from 'src/app/diets/models/queries/listDietQuery';
import { GetDietQuery } from 'src/app/diets/models/queries/GetDietQuery';
import { Content } from '../utils/content';
import { DietList } from 'src/app/diets/models/view-models/diet.list';
import { DietDetails } from 'src/app/diets/models/view-models/diet.details';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createDiet(command: CreateDietCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/diets`, command);
  }

  updateDiet(command: UpdateDietCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/diets/${command.id}`, command);
  }

  removeDiet(command: RemoveDietCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/diets/${command.id}`, Content.GetParams(command));
  }

  getDiet(query: listDietQuery): Observable<QueryResult<DietList>> {
    return this.http.get<QueryResult<DietList>>(`${this.url}/diets`, Content.GetParams(query));
  }

  getDietById(query: GetDietQuery): Observable<QueryResult<DietDetails>> {
    return this.http.get<QueryResult<DietDetails>>(`${this.url}/diets/${query.id}`, Content.GetParams(query));
  }
}
