import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommandResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';
import { User } from 'src/app/users/models/user.models';

import { CreateUserCommand } from 'src/app/users/models/commands/createUserCommand';
import { UpdateUserCommand } from 'src/app/users/models/commands/updateUserCommand';
import { RemoveUserCommand } from 'src/app/users/models/commands/removeUserCommand';
import { ListUserQuery } from 'src/app/users/models/queries/listUserQuery';
import { GetUserQuery } from 'src/app/users/models/queries/getUserQuery';
import { Content } from '../utils/content';
import { UserList } from 'src/app/users/models/view-models/user.list';
import { UserDetails } from 'src/app/users/models/view-models/user.details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(command: CreateUserCommand): Observable<CommandResult> {
    return this.http.post<CommandResult>(`${this.url}/users`, command);
  }

  updateUser(command: UpdateUserCommand): Observable<CommandResult> {
    return this.http.put<CommandResult>(`${this.url}/users/${command.id}`, command);
  }

  removeUser(command: RemoveUserCommand): Observable<CommandResult> {
    return this.http.delete<CommandResult>(`${this.url}/users/${command.id}`, Content.GetParams(command));
  }

  getUsers(query: ListUserQuery): Observable<QueryResult<UserList>> {
    return this.http.get<QueryResult<UserList>>(`${this.url}/users`, Content.GetParams(query));
  }

  getUserById(query: GetUserQuery): Observable<QueryResult<UserDetails>> {
    return this.http.get<QueryResult<UserDetails>>(`${this.url}/users/${query.id}`, Content.GetParams(query));
  }
}
