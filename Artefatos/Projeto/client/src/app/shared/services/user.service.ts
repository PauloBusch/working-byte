import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CommadResult } from 'src/app/shared/models/CommandRestult.model';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';
import { User } from 'src/app/users/models/user.models';

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
    return this.http.put<CommadResult>(`${this.url}/users/${user.id}`, user);
  }

  deleteUser(id: string): Observable<CommadResult> {
    return this.http.delete<CommadResult>(`${this.url}/users/${id}`);
  }

  getUsers(): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users`);
  }

  getUserById(id: string): Observable<QueryResult<User>> {
    return this.http.get<QueryResult<User>>(`${this.url}/users/${id}`);
  }
}
