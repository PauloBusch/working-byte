import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommadResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';
import { User } from 'src/app/users/models/user.models';

import { CreateUserCommand } from 'src/app/users/models/commands/createUserCommand';
import { UpdateUserCommand } from 'src/app/users/models/commands/updateUserCommand';
import { RemoveUserCommand } from 'src/app/users/models/commands/removeUserCommand';
import { ListUserQuery } from 'src/app/users/models/queries/listUserQuery';
import { GetUserQuery } from 'src/app/users/models/queries/getUserQuery';
import { Content } from '../utils/content';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(command: CreateUserCommand): Observable<CommadResult> {
    return this.http.post<CommadResult>(`${this.url}/users`, command);
  }

  updateUser(command: UpdateUserCommand): Observable<CommadResult> {
    return this.http.put<CommadResult>(`${this.url}/users/${command.id}`, command);
  }

  deleteUser(command: RemoveUserCommand): Observable<CommadResult> {
    return this.http.delete<CommadResult>(`${this.url}/users/${command.id}`);
  }

  getUsers(query: ListUserQuery): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users`, Content.GetParams(query));
  }

  getUserById(query: GetUserQuery): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users/${query.id}`, Content.GetParams(query));
  }
}
