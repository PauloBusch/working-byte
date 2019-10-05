import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../user/models/user.models';
import { environment } from '../../../environments/environment';
import { CommadResult } from '../models/CommandRestult.model';
import { QueryResult } from '../models/QueryResult.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<CommadResult> {
    return this.http.post<CommadResult>(`${this.url}/users`, user);
  }

  updateUser(user: User): Observable<CommadResult> {
    return this.http.put<CommadResult>(`${this.url}/users/${user.identifier}`, user);
  }

  deleteUser(identifier: string): Observable<CommadResult> {
    return this.http.delete<CommadResult>(`${this.url}/users/${identifier}`);
  }

  getUsers(): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users`);
  }

  getUserByIdentifier(identifier: string): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users/${identifier}`);
  }
}
