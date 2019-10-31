import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommandResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';

import { createDietCommand } from 'src/app/diets/models/commands/createDietCommand';
import { updateDietCommand } from 'src/app/diets/models/commands/updateDietCommand';
import { removeDietCommand } from 'src/app/diets/models/commands/removeDietCommand';
import { listDietQuery } from 'src/app/diets/models/queries/listDietQuery';
import { getDietQuery } from 'src/app/diets/models/queries/getDietQuery';
import { Content } from '../utils/content';
import { DietList } from 'src/app/diets/models/view-models/diet.list';
import { DietDetails } from 'src/app/diets/models/view-models/diet.details';

@Injectable({
  providedIn: 'root'
})
export class dietService {
  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(command: createDietCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/diets`, command);
  }

  updateUser(command: updateDietCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/diets/${command.id}`, command);
  }

  removeUser(command: removeDietCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/diets/${command.id}`, Content.GetParams(command));
  }

  getUsers(query: listDietQuery): Observable<QueryResult<DietList>> {
    return this.http.get<QueryResult<DietList>>(`${this.url}/diets`, Content.GetParams(query));
  }

  getUserById(query: getDietQuery): Observable<QueryResult<DietDetails>> {
    return this.http.get<QueryResult<DietDetails>>(`${this.url}/diets/${query.id}`, Content.GetParams(query));
  }
}
